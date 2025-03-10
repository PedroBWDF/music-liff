const { User } = require('../models')
const jwt = require('jsonwebtoken')

const liffController = {
    getUuid: async (req, res, next) => {
      console.log('Request received at /api/liff/uuid')
      const lineToken = req.headers['x-line-token']
      if (!lineToken) {
        const error = new Error('No LINE token provided')
        error.status = 401
        return next(error)
      }
  
      try {
        const profile = await fetch('https://api.line.me/v2/profile', {
          headers: { Authorization: `Bearer ${lineToken}` }
        }).then(res => res.json())
        console.log('LINE API response:', profile)
        if (profile.error) {
          const error = new Error(profile.error)
          error.status = 401
          throw error
        }
  
        const lineUuid = profile.userId
        // 查找是否有對應的用戶
        let user = await User.findOne({ where: { lineUuid } })
        if (!user) {
          // 如果沒有，建立新用戶
          user = await User.create({
            lineUuid,
            lineDisplayName: profile.displayName || 'Unnamed'  // 使用 LINE 的顯示名稱
          })
        }
  
        const userData = user.toJSON()
        delete userData.password
        const jwtToken = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
        
        // 存入 jwt cookie
        res.cookie('jwt', jwtToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000
        })
        
        // 供Handlebars使用
        res.locals.user = userData
  
        return res.json({
          line_uuid: profile.userId,
          line_display_name: user.lineDisplayName
        })
      } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch UUID' })
      }
    },

    updateDisplayName: async (req, res) => {
        const lineToken = req.headers['x-line-token']
        const { lineUuid, lineDisplayName } = req.body
    
        if (!lineToken) return res.status(401).json({ error: 'No token provided' })
        if (!lineUuid) return res.status(400).json({ error: 'Line UUID is required' })
        if (!lineDisplayName) return res.status(400).json({ error: 'Display name is required' })
    
        try {
          const user = await User.findOne({ where: { lineUuid } })
          if (!user) return res.status(404).json({ error: 'User not found' })
          
          // 更新顯示名稱
          user.lineDisplayName = lineDisplayName
          await user.save()
    
          return res.json({ success: true, line_display_name: user.lineDisplayName })
        } catch (err) {
          console.error('Error updating display name:', err)
          return res.status(500).json({ error: 'Failed to update display name' })
        }
      }
  }

module.exports = liffController
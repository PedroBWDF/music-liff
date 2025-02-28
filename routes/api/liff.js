const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

router.get('/uuid', async (req, res) => {
  console.log('Request received at /api/liff/uuid')
  const token = req.headers['authorization']?.split('Bearer ')[1]
  console.log('Extracted token:', token)
  if (!token) return res.status(401).json({ error: 'No token provided' })
  try {
    const profile = await fetch('https://api.line.me/v2/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json())
    console.log('LINE API response:', profile)
    if (profile.error) return res.status(401).json({ error: profile.error })
    const lineUuid = profile.userId
    // 查找是否有對應的使用者
    let user = await User.findOne({ where: { lineUuid } })
    if (!user) {
      // 如果沒有，創建新使用者
      user = await User.create({
        lineUuid,
        lineDisplayName: profile.displayName || 'Unnamed' // 使用 LINE 的顯示名稱
      })
    }

    const userData = user.toJSON()
    delete userData.password // 移除密碼，與現有 logIn 一致
    const jwtToken = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })


    res.cookie('jwt', jwtToken, {
      httpOnly: true, // 防止客户端 JavaScript 存取
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 天，與現有設定一致
    })

    // res.json({ line_uuid: profile.userId })
    res.json({
      line_uuid: profile.userId,
      line_display_name: user.lineDisplayName // 新增 lineDisplayName
    })
  } catch (err) {
    console.error('Error fetching LINE profile:', err)
    res.status(500).json({ error: 'Failed to fetch UUID' })
  }
})

module.exports = router
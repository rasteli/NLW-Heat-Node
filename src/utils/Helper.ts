class Helper {
  message: {
    text: string
    user_id: string
    created_at: string
    user: { name: string; avatar_url: string }
  }

  setMessageInfo(message) {
    this.message = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    }
  }

  get messageInfo() {
    return this.message
  }
}

export default new Helper()

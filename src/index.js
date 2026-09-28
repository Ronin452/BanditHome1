export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Bandit Home работает!");
    }

    const update = await request.json();

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || "";

      if (text === "/start") {
        await sendMessage(
          env.BOT_TOKEN,
          chatId,
          "🏠 <b>BANDIT HOME</b>\n\n" +
          "👋 Добро пожаловать!\n\n" +
          "🎮 Играй\n" +
          "💰 Зарабатывай монеты\n" +
          "⭐ Повышай уровень\n" +
          "🏆 Попадай в рейтинг\n\n" +
          "Выбери раздел 👇",
          mainKeyboard()
        );
      }
    }

    if (update.callback_query) {
      const query = update.callback_query;

      await answerCallback(env.BOT_TOKEN, query.id);

      if (query.data === "balance") {
        await editMessage(
          env.BOT_TOKEN,
          query.message.chat.id,
          query.message.message_id,
          "💰 <b>ТВОЙ БАЛАНС</b>\n\n🪙 Монеты: <b>100</b>",
          backKeyboard()
        );
      }

      if (query.data === "profile") {
        await editMessage(
          env.BOT_TOKEN,
          query.message.chat.id,
          query.message.message_id,
          "👤 <b>ТВОЙ ПРОФИЛЬ</b>\n\n" +
          `👤 ${query.from.first_name}\n` +
          "💰 Монеты: <b>100</b>\n" +
          "⭐ Уровень: <b>1</b>\n" +
          "✨ XP: <b>0</b>\n" +
          "🏆 Побед: <b>0</b>\n" +
          "🔥 Серия: <b>0</b>",
          backKeyboard()
        );
      }

      if (query.data === "games") {
        await editMessage(
          env.BOT_TOKEN,
          query.message.chat.id,
          query.message.message_id,
          "🎮 <b>ИГРЫ</b>\n\n" +
          "🎲 Кубики\n" +
          "✂️ Камень • Ножницы • Бумага\n" +
          "🧠 Викторина\n" +
          "⚡ Дуэли\n" +
          "🎯 Угадай число",
          backKeyboard()
        );
      }

      if (query.data === "rating") {
        await editMessage(
          env.BOT_TOKEN,
          query.message.chat.id,
          query.message.message_id,
          "🏆 <b>РЕЙТИНГ</b>\n\n🥇 Скоро здесь появятся лучшие игроки!",
          backKeyboard()
        );
      }

      if (query.data === "bonus") {
        await editMessage(
          env.BOT_TOKEN,
          query.message.chat.id,
          query.message.message_id,
          "🎁 <b>ЕЖЕДНЕВНЫЙ БОНУС</b>\n\nСкоро будет доступен.",
          backKeyboard()
        );
      }

      if (query.data === "shop") {
        await editMessage(
          env.BOT_TOKEN,
          query.message.chat.id,
          query.message.message_id,
          "🛒 <b>МАГАЗИН</b>\n\nСкоро здесь появятся предметы и улучшения.",
          backKeyboard()
        );
      }

      if (query.data === "donate") {
        await editMessage(
          env.BOT_TOKEN,
          query.message.chat.id,
          query.message.message_id,
          "💎 <b>ДОНАТ</b>\n\nСкоро здесь появится Telegram Stars ⭐",
          backKeyboard()
        );
      }

      if (query.data === "settings") {
        await editMessage(
          env.BOT_TOKEN,
          query.message.chat.id,
          query.message.message_id,
          "⚙️ <b>НАСТРОЙКИ</b>\n\nНастройки появятся здесь.",
          backKeyboard()
        );
      }

      if (query.data === "home") {
        await editMessage(
          env.BOT_TOKEN,
          query.message.chat.id,
          query.message.message_id,
          "🏠 <b>BANDIT HOME</b>\n\nВыбери нужный раздел 👇",
          mainKeyboard()
        );
      }
    }

    return new Response("OK");
  }
};

function mainKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "👤 Профиль", callback_data: "profile" },
        { text: "💰 Баланс", callback_data: "balance" }
      ],
      [
        { text: "🎮 Игры", callback_data: "games" },
        { text: "🏆 Рейтинг", callback_data: "rating" }
      ],
      [
        { text: "🎁 Бонус", callback_data: "bonus" },
        { text: "🛒 Магазин", callback_data: "shop" }
      ],
      [
        { text: "💎 Донат", callback_data: "donate" },
        { text: "⚙️ Настройки", callback_data: "settings" }
      ]
    ]
  };
}

function backKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "🔙 Назад", callback_data: "home" }]
    ]
  };
}

async function sendMessage(token, chatId, text, keyboard) {
  return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      reply_markup: keyboard
    })
  });
}

async function editMessage(token, chatId, messageId, text, keyboard) {
  return fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: "HTML",
      reply_markup: keyboard
    })
  });
}

async function answerCallback(token, callbackId) {
  return fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      callback_query_id: callbackId
    })
  });
          }

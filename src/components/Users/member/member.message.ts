export const MESSAGE_ADD_MEMBER = (email: string, password: string, subject: string, tokenUrl: string) => ({
  to: email,
  from: process.env.SENDGRID_FROM_EMAIL || '',
  subject: `【${process.env.APP_TITLE}】${subject}`,
  html: `
<!DOCTYPE html>
<html>
  <head>
    <title>メール認証</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      h1 {
        color: #0077b6; /* Heading Color */
      }
      p {
        color: #333; /* Text Color */
      }
      a {
        color: #e63946; /* Link Color */
      }
      #button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #0077b6; /* Button Background Color */
        color: #fff; /* Button Text Color */
        text-decoration: none;
        border-radius: 5px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #0077b6; /* Button Background Color */
        color: #fff; /* Button Text Color */
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <h1>ログイン資格情報</h1>

    <p>このメールに心当たりがない場合は、無視してください。</p>
    <span></span><br />
    <p>ユーザー名: ${email}</p>
    <p>パスワード: ${password}</p>
    <a href="${tokenUrl}" id="button" class="button">ログインの詳細</a>
  </body>
</html>

`,
});

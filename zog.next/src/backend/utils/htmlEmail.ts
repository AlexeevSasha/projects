import { SendEmailBody } from "../../pages/api/email/sendEmail";

export const AuthHtml = (params: { url: string; host: string }) => {
  const { url, host } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  return `
  <div style='font-family: "Montserrat", sans-serif;text-align: center;background: #f9f9f9;color: #666;padding: 40px;'>
           <div style='margin-bottom: 20px'>Вход на сайт <strong>${escapedHost}</strong></h4>
           <p style='margin-bottom: 14px'><span style='color: #101010; font-weight: 600; margin-right: 4px'>Здравствуйте, вы запросили вход для вашей учетной записи.</p>
           <a style='cursor: pointer;display: inline-block;font-weight: 500;text-decoration: none;padding: 12px;background: #346df1;color: white;'
              href='${url}'>Войти на сайт</a>
        
           <p style='margin-top: 10px;font-weight: 600;padding: 8px 0;'>Эта ссылка действительна в течение 24 часов и может быть использована только один раз.</p>
           <p style='margin-top: 30px;'>
             Если вы не запрашивали этого, вы можете проигнорировать это письмо или сообщить нам об этом.
           </p>
           </div>`;
};

export const AuthFromManualHtml = (params: { url: string; host: string }) => {
  const { url, host } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  return `
  <div style='font-family: "Montserrat", sans-serif;text-align: center;background: #f9f9f9;color: #666;padding: 40px;'>
           <div style='margin-bottom: 20px'>Вход на сайт <strong>${escapedHost}</strong></h4>
           <p style='margin-bottom: 14px'><span style='color: #101010; font-weight: 600; margin-right: 4px'>Здравствуйте.</p>
           <a style='cursor: pointer;display: inline-block;font-weight: 500;text-decoration: none;padding: 12px;background: #346df1;color: white;'
              href='${url}'>Войти на сайт</a>
        
           <p style='margin-top: 10px;font-weight: 600;padding: 8px 0;'>Эта ссылка действительна <string>всегда</string>.</p>
           <p style='margin-top: 30px;'>
             Если вы не запрашивали этого, вы можете проигнорировать это письмо или сообщить нам об этом.
           </p>
           </div>`;
};

export const orderSuccessHtml = (url: string, name: string) => {
  return `
  <div style='font-family: "Montserrat", sans-serif;text-align: center;background: #f9f9f9;color: #666;padding: 40px;'>
           <div style='margin-bottom: 20px'><h1>Здраствуйте, ${name}</h1></div>
           <p style='margin-bottom: 14px'><h2 style='color: #101010; font-weight: 600; margin-right: 4px'>Ваша диагностика готова</p>
           <a style='cursor: pointer;display: inline-block;font-weight: 500;text-decoration: none;padding: 12px;background: #346df1;color: white;'
              href='${url}'>Войти на сайт</a>
        
           <p style='margin-top: 10px;font-weight: 600;padding: 8px 0;'>Эта ссылка действительна в течение 24 часов и может быть использована только один раз.</p>         
           </div>`;
};

export const consultantHtml = (details: SendEmailBody["details"]) => {
  return ` <div style='font-family: "Montserrat", sans-serif;text-align: center;background: #f9f9f9;color: #666;padding: 40px;'>
           <h3 style='margin-bottom: 20px'> Здравствуйте ${details?.name || ""}</h3>
           <p style='margin-bottom: 14px;font-size: 18px;'><span style='color: #101010; font-weight: 600; margin-right: 4px'>Вас назначили консультаном.</p>
           <div style='margin-bottom: 8px'>Перейдите по ссылки, чтобы посмотреть подробно заявку  </div>
           <a style='cursor: pointer;display: inline-block;font-weight: 500;text-decoration: none;padding: 12px;background: #346df1;color: white;'
              href='${process.env.NEXTAUTH_URL}/lk/clients/${
    details?.clientId
  }'>Посмотреть заявку</a>
           <p style='margin-top: 30px;'>
             Если вы не запрашивали этого, вы можете проигнорировать это письмо или сообщить нам об этом.
           </p>
           </div>`;
};

export const consultantToClientHtml = (details: SendEmailBody["details"]) => {
  return ` <div style='font-family: "Montserrat", sans-serif;text-align: center;background: #f9f9f9;color: #666;padding: 40px;'>
           <h3 style='margin-bottom: 20px'> Здравствуйте ${details?.name || ""}</h3>
           <p style='margin-bottom: 14px;font-size: 18px;'><span style='color: #101010; font-weight: 600; margin-right: 4px'>Вам назначили консультанта - ${
             details?.email
           }</p>
           <div style='margin-bottom: 8px'>Перейдите по ссылки, чтобы посмотреть подробно заявку  </div>
           <a style='cursor: pointer;display: inline-block;font-weight: 500;text-decoration: none;padding: 12px;background: #346df1;color: white;'
              href='${process.env.NEXTAUTH_URL}/lk/clients/${
    details?.clientId
  }'>Посмотреть заявку</a>
           <p style='margin-top: 30px;'>
             Если вы не запрашивали этого, вы можете проигнорировать это письмо или сообщить нам об этом.
           </p>
           </div>`;
};

export const formAfterPay = (details: SendEmailBody["details"]) => {
  return ` <div style='font-family: "Montserrat", sans-serif;text-align: center;background: #f9f9f9;color: #666;padding: 40px;'>
           <h3 style='margin-bottom: 20px'> Здравствуйте</h3>    
           <div style='margin-bottom: 10px'>Перейдите по ссылки и заполните анкету </div>
           <a style='cursor: pointer;display: inline-block;font-weight: 500;text-decoration: none;padding: 16px;background: #346df1;color: white;'
              href='${details?.url}'>Перейти в анкету</a>
          <p style='margin-top: 10px;font-weight: 600;padding: 8px 0;'> <strong style="font-size: 20px">Это ссылка уникальная.</strong><br/> <br/> Ей можно пользоваться, пока вы не заполните форму. <span style="color: crimson"> Потом она станет недействительна!</span></p>
           <p style='margin-top: 30px;'>
             Если вы не запрашивали этого, вы можете проигнорировать это письмо или сообщить нам об этом.
           </p>
           </div>
  `;
};

export const formAfterPayAdmin = (details: SendEmailBody["details"]) => {
  return ` <div style='font-family: "Montserrat", sans-serif;text-align: center;background: #f9f9f9;color: #666;padding: 40px;'>
           <h3 style='margin-bottom: 20px'> Здравствуйте</h3>    
           <div style='margin-bottom: 10px;font-weight: 600;padding: 8px 0;font-size: 20px'>Уникальная ссылка для пользователя - ${details?.email}</div>
           <a  href='${details?.url}' style="display: inline-block;font-weight: 500;text-decoration: none;padding: 16px;background: #346df1;color: white;">${details?.url}</a>
          <p style='margin-top: 10px;font-weight: 600;padding: 8px 0;'> Ей можно пользоваться, пока вы не заполните форму. <span style="color: crimson"> Потом она станет недействительна!</span></p>
           <p style='margin-top: 30px;'>
             Если вы не запрашивали этого, вы можете проигнорировать это письмо или сообщить нам об этом.
           </p>
           </div>
  `;
};

export const consultConductedHtml = (details: SendEmailBody["details"]) => {
  return ` <div style='font-family: "Montserrat", sans-serif;text-align: center;background: #f9f9f9;color: #666;padding: 40px;'>
           <h1 style='margin-bottom: 20px'> Здравствуйте, ${details?.name}</h1>    
           <div style='margin-bottom: 10px;font-weight: 500;padding: 8px 0;font-size: 20px'>Мы надеемся что полученная вами диагностика у Олега Торсунова + консультация, оказалась для вас полезна и вы остались довольны. </div>
          <p style='margin-top: 10px;font-weight: 600;padding: 8px 0;'>Пожалуйста, помогите нам стать лучше для Вас, оставьте свою обратную связь о данной программе</p>
           <a style='cursor: pointer;display: inline-block;font-weight: 500;text-decoration: none;padding: 12px;background: #346df1;color: white;' href="${process.env.NEXTAUTH_URL}/review">Оставить обратную связь</a>
           </div>
  `;
};

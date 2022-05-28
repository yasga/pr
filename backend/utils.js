import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';
import nodemailer from 'nodemailer';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};


export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: 'yasine gouma <yassinegouma91@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  }

  await transporter.sendMail(mailOptions)
}

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });
export const emailTemplate = () => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="telephone=no" name="format-detection">
      <title></title>
      <!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]-->
      <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
      <!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  </head>
  
  <body>
      <div class="es-wrapper-color">
          <!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                  <v:fill type="tile" color="#efefef"></v:fill>
              </v:background>
          <![endif]-->
          <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
              <tbody>
                  <tr>
                      <td class="esd-email-paddings" valign="top">
                          <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center" esd-custom-block-id="89315">
                                          <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p10t es-p10b es-p20r es-p20l" align="left">
                                                          <!--[if mso]><table width="560" cellpadding="0" 
                          cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                                          <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="es-m-p20b esd-container-frame" width="270" align="left">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                                          <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="270" align="left">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="right" class="esd-block-text es-infoblock es-m-txt-c">
                                                                                          <p style="line-height: 150%;">Trouble viewing this email? <strong><a target="_blank" href="https://viewstripo.email" class="view">Try Here</a></strong></p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text">
                                                                                          <p style="line-height: 150%;"><em><strong>Bienvenue chez JayShop&nbsp;Maroc – votre magasin de mobilier et décoration</strong></em></p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-header" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center" esd-custom-block-id="89316">
                                          <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure" esd-general-paddings-checked="false" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-image es-p10t es-p15b es-p5r es-p5l" align="center" style="font-size: 0px;">
                                                                                          <a target="_blank" href="https://viewstripo.email"><img src="https://demo.stripocdn.email/content/guids/videoImgGuid/images/11831502198238658_ePO.png" alt="Sport logo" title="Sport logo" width="104" style="display: block;"></a>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" style="background-color: #555659;" esd-custom-block-id="1488" bgcolor="#555659" align="center">
                                          <table class="es-content-body" style="background-color: #555659;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p10t es-p10b es-p20r es-p20l" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-menu" esd-img-prev-h="16" esd-img-prev-w="16">
                                                                                          <table class="es-menu" width="100%" cellspacing="0" cellpadding="0">
                                                                                              <tbody>
                                                                                                  <tr class="links">
                                                                                                      <td class="es-p10t es-p10b es-p5r es-p5l " style="padding-bottom: 0px; padding-top: 0px; " width="33.33%" bgcolor="transparent" align="center"><a target="_blank" style="color: #ffffff; font-weight: bold;" href="https://viewstripo.email">Meubles</a></td>
                                                                                                      <td class="es-p10t es-p10b es-p5r es-p5l " style="border-left: 1px solid #ffffff; padding-bottom: 0px; padding-top: 0px; " width="33.33%" bgcolor="transparent" align="center"><a target="_blank" style="color: #ffffff; font-weight: bold;" href="https://viewstripo.email">Lits et matelas</a></td>
                                                                                                      <td class="es-p10t es-p10b es-p5r es-p5l " style="border-left: 1px solid #ffffff; padding-bottom: 0px; padding-top: 0px; " width="33.33%" bgcolor="transparent" align="center"><a target="_blank" style="color: #ffffff; font-weight: bold;" href="https://viewstripo.email">cuisine et électroménager</a></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure" esd-general-paddings-checked="false" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-banner" style="position: relative;" align="center">
                                                                                          <a target="_blank" href="https://viewstripo.email/"><img class="adapt-img esdev-stretch-width esdev-banner-rendered" src="https://demo.stripocdn.email/content/guids/bannerImgGuid/images/image16535822666455354.png" alt="Final Summer SALE EXTRA 50% OFF Use code SUMMER18. ONLINE & IN STORE" title="Final Summer SALE EXTRA 50% OFF Use code SUMMER18. ONLINE & IN STORE" width="100%"></a>
                                                                                          <esd-config-block style="display: none;">
                                                                                              <esd-original-image scale="1" leftshift="0" topshift="0">https://demo.stripocdn.email/content/guids/fd6bb1fe-93e1-4b07-9eef-28b6176bc984/images/com.jpg</esd-original-image>
                                                                                              <esd-aspect-ratio>-1</esd-aspect-ratio>
                                                                                              <esd-banner-caption leftshift="0px" topshift="420px" width="592px" height="27px" class="banner-caption-1533818301594">
                                                                                                  <p style="font-size: 18px; color: #000000; font-family: 'open sans', 'helvetica neue', helvetica, arial, sans-serif;">Use code SUMMER18. ONLINE & IN STORE</p>
                                                                                              </esd-banner-caption>
                                                                                              <esd-banner-container-resolution>600x384</esd-banner-container-resolution>
                                                                                              <esd-additional-picture leftshift="151px" topshift="478px" width="284.4px" height="46.2625px" keepaspectratio="true"> https://tlr.stripocdn.email/content/guids/CABINET_8c56fa7e357a745c57054e91846bcd6e/images/61531533818972485.png </esd-additional-picture>
                                                                                          </esd-config-block>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr class="es-hidden">
                                                                                      <td class="esd-block-spacer es-p20t es-p20r es-p20l" align="center" style="font-size:0">
                                                                                          <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p30t es-p20r es-p20l" esd-general-paddings-checked="false" esd-custom-block-id="1487" align="left">
                                                          <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="184" valign="top"><![endif]-->
                                                          <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="es-m-p0r es-m-p20b esd-container-frame" width="184" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-text" align="left">
                                                                                          <h1 style="color: #333333; font-family: arial, 'helvetica neue', helvetica, sans-serif;"><span style="font-size: 34px; line-height: 120%;">Catalogue</span>&nbsp;</h1>
                                                                                          <h1 style="color: #333333; font-family: arial, 'helvetica neue', helvetica, sans-serif;"><span style="color: #ddca0d; line-height: 120%; font-size: 34px;">été 2022</span>&nbsp;</h1>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-m-txt-c" align="left">
                                                                                          <p>Nous sommes à vos côtés quelque soit le moment de l’année en vous proposant des prix qui vous aideront à faire de vraies économies.</p>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-button es-p5t es-p5b" align="left"><span class="es-button-border" style="border-style: solid; border-radius: 0px; background: transparent none repeat scroll 0% 0%; border-color: #bbbbdb; border-width: 0px;"><a href="https://viewstripo.email/" class="es-button es-button-1653580519837" target="_blank" style="border-radius: 0px; background: none 0% 0% repeat scroll transparent; border-color: transparent; font-weight: bold; font-size: 16px; border-width: 5px 0px; color: #666666;">+ Achetez maintenant</a></span></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td><td width="20"></td><td width="356" valign="top"><![endif]-->
                                                          <table cellspacing="0" cellpadding="0" align="right">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="356" align="left">
                                                                          <table style="background-color: #efefef;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#efefef">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-image es-p10t es-p10b es-p10r es-p10l" align="center" style="font-size: 0px;">
                                                                                          <a target="_blank" href="https://viewstripo.email/"><img class="adapt-img" src="https://demo.stripocdn.email/content/guids/videoImgGuid/images/store984393_960_720.jpeg" alt style="display: block;" width="336"></a>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-spacer es-p20t es-p20r es-p20l" align="center" style="font-size:0">
                                                                                          <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p20" esd-general-paddings-checked="false" esd-custom-block-id="1486" align="left">
                                                          <!--[if mso]><table dir="rtl" width="560" cellpadding="0" cellspacing="0"><tr><td dir="ltr" width="356" valign="top"><![endif]-->
                                                          <table cellspacing="0" cellpadding="0" align="right">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame es-m-p20b" width="184" align="left">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-text" align="left">
                                                                                          <h1 style="color: #333333; line-height: 120%;">Produits</h1>
                                                                                          <h1 style="color: #e69138; line-height: 120%; font-size: 34px;">populaires</h1>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p10t es-p10b es-m-txt-c" align="left">
                                                                                          <p>Parcourez notre catalogue et choisissez notre gamme passionnante d'articles à des prix abordables !</p>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-button es-p5t es-p5b" align="left"><span class="es-button-border" style="border-style: solid; border-radius: 0px; background: transparent none repeat scroll 0% 0%; border-color: #bbbbdb; border-width: 0px;"><a href="https://viewstripo.email/" class="es-button es-button-1653580519840" target="_blank" style="border-radius: 0px; background: none 0% 0% repeat scroll transparent; border-color: transparent; font-weight: bold; font-size: 16px; border-width: 5px 0px; color: #666666;">+ Achetez maintenant</a></span></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td><td dir="ltr" width="20"></td><td dir="ltr" width="184" valign="top"><![endif]-->
                                                          <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="es-m-p0r esd-container-frame" width="356" valign="top" align="center">
                                                                          <table style="background-color: #efefef;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#efefef">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-image es-p10" align="center" style="font-size: 0px;">
                                                                                          <a target="_blank" href="https://viewstripo.email/"><img class="adapt-img" src="https://demo.stripocdn.email/content/guids/videoImgGuid/images/mensshoes875948_960_720_mi4.jpeg" alt style="display: block;" width="336"></a>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center" esd-custom-block-id="89320">
                                          <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p10t es-p20r es-p20l" esd-general-paddings-checked="false" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-spacer es-p20t es-p20b" align="center" style="font-size:0">
                                                                                          <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-social es-p10t es-p10b" align="center" style="font-size:0">
                                                                                          <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td class="es-p20r" valign="top" align="center">
                                                                                                          <a href><img title="Twitter" src="https://stripo.email/cabinet/assets/editor/assets/img/social-icons/square-colored/twitter-square-colored.png" alt="Tw" width="32"></a>
                                                                                                      </td>
                                                                                                      <td class="es-p20r" valign="top" align="center">
                                                                                                          <a href><img title="Facebook" src="https://stripo.email/cabinet/assets/editor/assets/img/social-icons/square-colored/facebook-square-colored.png" alt="Fb" width="32"></a>
                                                                                                      </td>
                                                                                                      <td class="es-p20r" valign="top" align="center">
                                                                                                          <a href><img title="Youtube" src="https://stripo.email/cabinet/assets/editor/assets/img/social-icons/square-colored/youtube-square-colored.png" alt="Yt" width="32"></a>
                                                                                                      </td>
                                                                                                      <td class="es-p20r" valign="top" align="center">
                                                                                                          <a href><img title="Linkedin" src="https://stripo.email/cabinet/assets/editor/assets/img/social-icons/square-colored/linkedin-square-colored.png" alt="In" width="32"></a>
                                                                                                      </td>
                                                                                                      <td valign="top" align="center">
                                                                                                          <a href><img title="Pinterest" src="https://stripo.email/cabinet/assets/editor/assets/img/social-icons/square-colored/pinterest-square-colored.png" alt="P" width="32"></a>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                          <p style="line-height: 150%;"><strong><a target="_blank" class="unsubscribe" style="line-height: 150%;"></a></strong>Vous recevez cet e-mail parce que vous avez visité notre site ou nous avez posé des questions sur la newsletter régulière. Si vous ne souhaitez pas recevoir cet e-mail&nbsp;<strong><a target="_blank" class="unsubscribe" style="line-height: 150%;" href="https://viewstripo.email">désabonnez-vous ici</a></strong>.</p>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p10t es-p10b" align="center">
                                                                                          <p>© 2022 JayShop</p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="esd-footer-popover es-content" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p30t es-p30b es-p20r es-p20l" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </body>
  
  </html>`;
};

export const payOrderEmailTemplate = (order) => {
  return `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${order.user.name},</p>
  <p>We have finished processing your order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.quantity}</td>
    <td align="right"> $${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Shipping Price:</td>
  <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>

  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};

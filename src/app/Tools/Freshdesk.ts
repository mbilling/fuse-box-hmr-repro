import crypto = require('crypto');
import util = require('util');
import moment = require('moment');
import parse = require('parse');



class Freshdesk {

   private static dummy = 'a1981b73c5845d67e1113cb2d571380b';

   public static GetSsoUrl(redirectTo: string): string {
      let name = Parse.User.current().getUsername().split('@')[0];
      let email = Parse.User.current().getUsername();
      let timeSecs = (moment().valueOf() / 1000).toString();
      let url = util.format("http://support.scitylana.com/login/sso?name=%s&email=%s&timestamp=%s&hash=%s&redirect_to=%s",
         encodeURIComponent(name),
         encodeURIComponent(email),
         timeSecs,
         Freshdesk.GetHash(Freshdesk.dummy, name, email, timeSecs),
         (redirectTo.indexOf('http://') == 0 ? '' : 'http://') + encodeURIComponent(redirectTo)      // We need to implement SSL on support.scitylana.com
      );
      return url;
   }

   private static GetHash(secret: string, name: string, email: string, timeSecs: string): string {
      let input = name + secret + email + timeSecs;
      let hmac = crypto.createHmac("md5", secret);
      hmac.update(input);
      let hash = hmac.digest("hex");
      return hash;
   }
}

export = Freshdesk;
import parse = require('parse');



class CustomerIO {

   public static Identify() {

      return Parse.Cloud.run('cioIdentify');
   }

}

export = CustomerIO;
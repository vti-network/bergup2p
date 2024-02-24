const UrlHI  = 'https://bergu-hi-default-rtdb.asia-southeast1.firebasedatabase.app/hi.json';
const keyHI = '?auth=WoiOT2RBrdGZpIlxCnyJ3Wne3SUnGcHdE8YkNchu';

(async function(){
    try {
        const response = await fetch(UrlHI+keyHI, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const checkData = await response.json();

        // Melakukan ekstraksi dari setiap objek dalam objek data
        for (const key in checkData) {
            if (Object.hasOwnProperty.call(checkData, key)) {
                const item = checkData[key];
                const { date, jumlah, opt, pengirim ,penerima,mata_uang, address } = item;
                if (address === '99999'){
    
                    const a = {
                        address: address,
                        date: date,
                        opt: opt,
                        mata_uang: mata_uang,
                        jumlah: jumlah,
                        penerima: penerima,
                        pengirim: pengirim
                    }

                    console.log(a);

                }
            }
        }
        for (var id in checkData) {
            if (checkData.hasOwnProperty(id)) {
                if (checkData[id].address === '99999') {
                    console.log("ID:", id);
                }
            }
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
})();


// // Respons JSON yang Anda dapatkan
// var responseJson = '{
//     "-NrM9iT-zgcc-ppuNm_7": {
//       "alamat": "QsY0j8C2kXvCNDS",
//       "bergu": 68500,
//       "email": "lobaduit1991@gmail.com",
//       "otp": "67630",
//       "password": "123456",
//       "secretkey": "QsY0j8C2kXvCNDS",
//       "token": "RErM0wA5k4sZ1A4"
//     },
//     "-NrMLY_U0rSunH_tqCEF": {
//       "alamat": "xvMufq9DdVzG5yk",
//       "bergu": 0,
//       "email": "azpwkk@gmail.com",
//       "otp": "66239",
//       "password": "09121991",
//       "secretkey": "xvMufq9DdVzG5yk",
//       "token": "EnMWKq60j9hCVT1"
//     }
//   }';
  
//   // Ubah string JSON menjadi objek JavaScript
//   var data = JSON.parse(responseJson);
  
//   // Alamat yang ingin Anda jadikan acuan
//   var alamatAcuan = "QsY0j8C2kXvCNDS";
  
//   // Loop melalui setiap entri dalam data dan cek alamat
//   for (var id in data) {
//       if (data.hasOwnProperty(id)) {
//           if (data[id].alamat === alamatAcuan) {
//               console.log("ID:", id);
//           }
//       }
//   }
  
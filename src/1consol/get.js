const UrlHI  = 'https://bergu-hi-default-rtdb.asia-southeast1.firebasedatabase.app/hi.json';
const keyHI = 'WoiOT2RBrdGZpIlxCnyJ3Wne3SUnGcHdE8YkNchu'

(async function(){
    try {
        const response = await fetch(Url, {
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
                if (address === '098765'){
    
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
        
      } catch (error) {
        console.error("Error:", error.message);
      }
})();

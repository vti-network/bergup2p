const Url  = 'https://bergu-hi-default-rtdb.asia-southeast1.firebasedatabase.app/hi.json';
const Auth = '?auth=WoiOT2RBrdGZpIlxCnyJ3Wne3SUnGcHdE8YkNchu';

(async function(){
    const pengirim = {
        address:"99999",
        date: "pengirim",
        opt: "pengirim",
        mata_uang: "pengirim",
        jumlah: "1",
        penerima: "pengirim",
        pengirim: "pengirim"
    }
    try {
        const response = await fetch(Url+Auth, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pengirim),
        });
        const checkData = await response.json();
        console.log(checkData);
        penerima();
      } catch (error) {
        console.error("Error:", error.message);
      }
})();

async function penerima(){
    const penerima = {
        address:"098765",
        date: "null",
        opt: "kirim",
        mata_uang: "idr",
        jumlah: "1",
        penerima: "xx",
        pengirim: "zz"
    }
    try {
        const response = await fetch(Url+Auth, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(penerima),
        });
        const checkData = await response.json();
        console.log(checkData);
      } catch (error) {
        console.error("Error:", error.message);
      }
}
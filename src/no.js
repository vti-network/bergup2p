function generateRandomNumber() {
    var randomNumber = Math.floor(Math.random() * 10000); // Menghasilkan angka acak antara 0 dan 99999
    return randomNumber;
  }
  
  // Menggunakan fungsi untuk menghasilkan angka acak
  var random_number = generateRandomNumber();
  console.log(random_number);
  
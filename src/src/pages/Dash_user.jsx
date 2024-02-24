import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../com/Navbar.jsx';
//import { Code, Auth, urlEPI, EPI, keyEPI } from "../conf/conf";
import { Code, Auth, urlEPI, EPI, keyEPI , urlHI , HI , keyHI, } from "../conf/conf";
import {Hash} from '../func/Hash.jsx';

export function DashboardUser() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const rm_ext1 = async () => {
      localStorage.removeItem('ext1');  
    }
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = async () => {
      setIsModalOpen(false);
      await rm_ext1();
    };
    //
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = localStorage.getItem('refresh_token');
        if (!checkToken) {
            navigate("/login");
            alert("Please log in first");
        }
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div className='container'>
                <br /><br />
                <button onClick={openModal}>Kirim</button>
            </div>
            <Info />
            <History />
            <PageKirim isModalOpen={isModalOpen} closeModal={closeModal}/>
        </>
    );
}
//================================
function Info() {
    const [alamat, setAlamat] = useState('');
    const [BERGU, setBERGU] = useState('');

    useEffect(() => {
        async function fetchDataAndUpdateState() {
            try {
                const data = await fetchInfo();
                const myid = localStorage.getItem('refresh_token');
                if (myid && data[myid]) {
                    const { alamat , bergu } = data[myid];
                    setAlamat(alamat);
                    setBERGU(bergu);
                    //setBERGU(balance?.bergu || '');
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        //fetchDataAndUpdateState();
        const intervalId = setInterval(fetchDataAndUpdateState, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='container'>
            <h3>Info</h3>
            <table>
                <thead>
                    <tr>
                        <td>Alamat:</td>
                        <td>BERGU:</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id='alamat'>{alamat}</td>
                        <td id='Bergu'>{BERGU}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
async function fetchInfo() {
    try {
        const response = await fetch(urlEPI+EPI+Code+Auth+keyEPI, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error:", error.message);
        throw new Error('Failed to fetch data');
    }
}
//================================

//================================
function History() {
    // const [date, setdate] = useState('');
    // const [jumlah, setjumlah] = useState('');
    // const [uang, setuang] = useState('');
    // const [opt, setopt] = useState('');
    // const [penerima, setpenerima] = useState('');
    // const [pengirim, setpengirim] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        async function fetchDataAndUpdateState() {
            try {
                const checkData  = await fetchHistory();
                const myid = localStorage.getItem('refresh_token');

                // for (const key in checkData) {
                //     if (Object.hasOwnProperty.call(checkData, key)) {
                //         const item = checkData[key];
                //         const { date, jumlah, opt, pengirim, penerima, mata_uang ,tag} = item;
                //         if (tag === myid) {
                //             // console.log("Date:", date);
                //             // console.log("Jumlah:", jumlah);
                //             // console.log("Opt:", opt);
                //             // console.log("Mata Uang:", mata_uang);
                //             // console.log("Pengirim:", pengirim);
                //             // console.log("Penerima:", penerima);
                //             //
                //             const n = await formatISODate(date);
                //             setdate (n);
                //             setjumlah (jumlah);
                //             setuang (mata_uang);
                //             setopt (opt);
                //             setpenerima (penerima);
                //             setpengirim (pengirim);
                //             //
                //         }
                //     }
                // }
                // Melakukan ekstraksi dari setiap objek dalam objek data
                for (const key in checkData) {
                    if (Object.hasOwnProperty.call(checkData, key)) {
                        const item = checkData[key];
                        const { date, jumlah, opt, pengirim, penerima, mata_uang , tag } = item;
                        if (tag === myid){
                            const n = await formatISODate(date);
                            setHistory(prevHistory => [...prevHistory, {
                                date: n,
                                jumlah: jumlah,
                                uang: mata_uang,
                                opt: opt,
                                penerima: penerima,
                                pengirim: pengirim
                            }]);
            
                            // const transaction = { // Variabel dengan nama yang lebih deskriptif
                            //     date: date,
                            //     opt: opt,
                            //     mata_uang: mata_uang,
                            //     jumlah: jumlah,
                            //     penerima: penerima,
                            //     pengirim: pengirim
                            // }

                            //console.log(transaction); // Output transaksi
                        }
                    }
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        fetchDataAndUpdateState();
        
    }, []);

    return (
        <div className='container'>
            <h3>History</h3>
            <table>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={index}>
                            <br />
                            <tr>Date - {item.date}</tr>
                            <tr>Jumlah - {item.jumlah}</tr>
                            <tr>Mata Uang - {item.uang}</tr>
                            <tr>Option - {item.opt}</tr>
                            <tr>Penerima - {item.penerima}</tr>
                            <tr>Pengirim - {item.pengirim}</tr>
                            <br />
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
    );
    
}
async function fetchHistory() {
    try {
        const response = await fetch(urlHI+HI+Code+Auth+keyHI, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error:", error.message);
        throw new Error('Failed to fetch data');
    }
}
//================================
function PageKirim({ isModalOpen, closeModal }) {
    const [alamat, setAlamat] = useState('');
    const [BERGU, setBERGU] = useState('');
    const [penerima, setPenerima] = useState('');
    let [IDpenerima, setIDPenerima] = useState('');
    const [jumlah, setJumlah] = useState('1500');

    useEffect(() => {
        //fetchDataAndUpdateState();
        const intervalId = setInterval(fetchDataAndUpdateState, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchDataAndUpdateState = async () => {
        try {
            const data = await fetchInfo();
            const myid = localStorage.getItem('refresh_token');
            if (myid && data[myid]) {
                const { alamat, bergu } = data[myid];
                setAlamat(alamat);
                setBERGU(bergu);
            }
 
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const handlePenerima = (event) => {
        setPenerima(event.target.value);
        //setIDPenerima(event.target.value);
    };

    const handleJumlah = (event) => {
        setJumlah(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await fetchInfo();

            //bagian pengirim            
            const myid = localStorage.getItem('refresh_token');
            if (myid && data[myid]) {
                const { alamat, email, password, secretkey, otp, token, bergu } = data[myid];
                
                if (jumlah < 1500) {
                    throw new Error(`Jumlah ${jumlah} tidak valid. Minimal kirim 1500.`);
                }

                if (bergu <= 0) {
                    throw new Error(`Saldo tidak mencukupi. Saldo IDR: ${bergu}`);
                }

                if (jumlah > bergu) {
                    throw new Error(`Jumlah ${jumlah} lebih besar dari saldo ${bergu}.`);
                }

                if (penerima === alamat) {
                    throw new Error(`anda tidak bisa kirim ke sendiri`);
                }
                const receiver = Object.values(data).map(entry => entry.alamat);
                if (!receiver.includes(penerima)) {
                    throw new Error(`Penerima ${penerima} tidak valid.`);
                } else {
                    for (var id in data) {
                        if (data.hasOwnProperty(id)) {
                            if (data[id].address === penerima) {
                                //console.log("ID:", id);
                                // setIDPenerima(id)
                                // alert(id);
                                // localStorage.setItem('ext1',id);
                            }
                        }
                    } 
                    setIDPenerima(id)
                    //alert(id);
                    localStorage.setItem('ext1',id);
                    
                }
                //bagian pengirim
                const fee = 500;
                const minus = bergu - jumlah - fee;
                await minusPengirim(alamat, email, password, secretkey, otp, token, bergu, penerima ,minus , jumlah);
                //bagian penerima
                const sender  = alamat;
                const plus = + jumlah;
                await plusPenerima(penerima, plus ,sender);

            }

        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error('Error:', error.message);
        }
    };

    return (
        <div className='container'>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="form-container">
                    <h1>Kirim</h1>
                    <label>Alamat tujuan:</label>
                    <input type="text" value={penerima} onChange={handlePenerima} />

                    <label>Jumlah:</label>
                    <input type="text" value={jumlah} onChange={handleJumlah} />

                    <button type="submit">Send</button>

                    <span>Alamat: {alamat}</span>
                    <span>Saldo BERGU: {BERGU}</span>
                    <span>Kirim: {jumlah}</span>
                    <span>id penerima: {IDpenerima}</span>
                </form>
            </Modal>
        </div>
    );
}
//==========================================================================================================
const minusPengirim = async (alamat, email, password, secretkey, otp, token, bergu,penerima, minus ,jumlah) => {
    const body = {
        email,
        password,
        alamat,
        secretkey,
        bergu: minus,
        token,
        otp,
    };
    try {
        const myid = localStorage.getItem('refresh_token');
        const response = await fetch(urlEPI + EPI + '/' + myid + Code + Auth + keyEPI, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Terjadi kesalahan saat mengirim permintaan.");
        }
        alert('Berhasil. kirim dengan biaya 500');
        await historyPengirim(alamat,jumlah,penerima);
        //console.log(body);
    } catch (error) {
        console.error("Error:", error.message);
        throw new Error("Terjadi kesalahan saat mengirim permintaan.");
    }
}
const historyPengirim = async (alamat,jumlah,penerima) => {
    const d = new Date();
    const tag = localStorage.getItem('refresh_token');
    const body = {
        date: d,
        opt: "kirim",
        jumlah: jumlah,
        mata_uang: "bergu",
        pengirim: alamat,
        penerima: penerima,
        txhash: "BRG-"+Hash(),
        tag: tag,
    };
    try {
        const response = await fetch(urlHI+HI+Code+Auth+keyHI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return await response.json();
    } catch (error) {
        console.error("Error:", error.message);
        throw new Error('Failed to fetch data');
    }
}

//==========================================================================================================
const plusPenerima = async (penerima, plus ,sender) => {
    try {
        const data = await fetchInfo();
        //bagian pengirim            
        const ext1 = localStorage.getItem('ext1');
        if (ext1 && data[ext1]) {
            const { alamat, email, password, secretkey, otp, token ,bergu } = data[ext1];
            const body = {
                email,
                password,
                alamat,
                secretkey,
                bergu: bergu + plus,
                token,
                otp,
            };

            const response = await fetch(urlEPI + EPI + '/' + ext1 + Code + Auth + keyEPI, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
    
            if (!response.ok) {
                throw new Error("Terjadi kesalahan saat mengirim permintaan.");
            }
            alert('Berhasil. menerima ',plus);
            historyPenerima(penerima, plus, sender);
            //console.log(body);
        }
    } catch (error) {

    }
};
const historyPenerima = async (penerima, plus, sender) => {
    const d = new Date();
    const tag = localStorage.getItem('ext1');
    const body = {
        date: d,
        opt: "terima",
        jumlah: plus,
        mata_uang: "bergu",
        pengirim: sender,
        penerima: penerima,
        txhash: "BRG-"+Hash(),
        tag: tag,
    };
    try {
        const response = await fetch(urlHI+HI+Code+Auth+keyHI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        
        return await response.json();
    } catch (error) {
        console.error("Error:", error.message);
        throw new Error('Failed to fetch data');
    }
}
//==========================================================================================================

//
async function formatISODate(date) {
    var tanggal = new Date(date);
    var tahun = tanggal.getFullYear();
    var bulan = ('0' + (tanggal.getMonth() + 1)).slice(-2); // Penambahan '0' di depan jika bulan < 10
    var tanggalan = ('0' + tanggal.getDate()).slice(-2); // Penambahan '0' di depan jika tanggal < 10
    var jam = ('0' + tanggal.getHours()).slice(-2); // Penambahan '0' di depan jika jam < 10
    var menit = ('0' + tanggal.getMinutes()).slice(-2); // Penambahan '0' di depan jika menit < 10
    var detik = ('0' + tanggal.getSeconds()).slice(-2); // Penambahan '0' di depan jika detik < 10

    // Format baru
    var newDT = tahun + '-' + bulan + '-' + tanggalan + ' ' + jam + ':' + menit + ':' + detik;
    return newDT
}

// modal
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-button" onClick={onClose}>x</span>
          {children}
        </div>
      </div>
    );
  };
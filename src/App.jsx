import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Image from './assets/img.png'

const App = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [nameA, setNameA] = useState("")
  const [nameB, setNameB] = useState("")
  const [result, setResult] = useState("")
  const [filteredData, setFilteredData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get('http://localhost:3030/user')
        setData(res.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleClick = (item) => {
    navigate(`/user-details/${item.id}`, { state: { item } })
  }
  const findIntermediary = () => {

    const userA = data.find((item) => item.name.toLowerCase().trim() === nameA.toLowerCase().trim());
    const userB = data.find((item) => item.name.toLowerCase().trim() === nameB.toLowerCase().trim());

    if (!userA && !userB) {
      setFilteredData([]);
      setResult("Ismlar Ro'yhatda Topilmadi");
      return;
    }
    if (!userA || !userB) {
      setFilteredData([]);
      setResult(`${nameA} va ${nameB} o'rtasida bog'liqlik topilmadi`);
      return;
    }

    for (let intermediaryName of userA.knows || []) {
      const intermediary = data.find((item) => item.name.toLowerCase() === intermediaryName.toLowerCase());
      if (intermediary && (intermediary.knows || []).some(name => name.toLowerCase() === nameB.toLowerCase())) {
        setResult(`${nameA} va ${nameB} ni ${intermediary.name} bog'lab turibdi`);
        setFilteredData([userA, userB, intermediary]);
        return;
      }
    }

    setResult(`${nameA} va ${nameB} o'rtasida umumiy tanish topilmadi.`);
    setFilteredData([userA, userB])
  };
  const openModal = () => {
    if (window.innerWidth < 768) {
      setIsModalOpen(true);
    } else {
      findIntermediary();
    }
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const handleSearch = () => {
    findIntermediary();
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="py-2 bg-[rgb(0,69,146)]">
        <div className="px-5 md:px-8 lg:px-16">
          <div className="flex items-center justify-between">
            <div className="w-[80px]">
              <img src={Image} alt="" />
            </div>
            <div className="flex gap-5 lg:gap-10">
              <input type="text" placeholder="1-shaxs ismini kiriting" value={nameA} onChange={(e) => setNameA(e.target.value)} className="hidden md:w-2/4 lg:w-full md:block border p-4  outline-none rounded-md" />
              <input type="text" placeholder="2-shaxs ismini kiriting" value={nameB} onChange={(e) => setNameB(e.target.value)} className="hidden md:w-2/4 lg:w-full md:block border p-4  outline-none rounded-md" />
              <button type="button" onClick={findIntermediary} className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hidden hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Qidirish</button>
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4 relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-semibold text-center">Bog'liqlikni Qidirish</h2>
                  <input
                    type="text"
                    placeholder="1-shaxs ismi"
                    value={nameA}
                    onChange={(e) => setNameA(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="2-shaxs ismi"
                    value={nameB}
                    onChange={(e) => setNameB(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                  <button
                    onClick={handleSearch}
                    className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
                  >
                    Qidirish
                  </button>
                </div>
              </div>
            )}
            <button type="button" class="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={openModal}>Qidirish</button>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2">
          {
            (filteredData === null ? data : filteredData).map(item => (
              <button key={item.id} onClick={() => handleClick(item)} className="border-2 border-black flex gap-5 px-2 text-left">
                <div className="w-[150px] h-[150px] sm:w-[200px] md:w-[150px] lg:w-[218px] xl:w-[170px]">
                  <img src={item.image} alt="Image" />  {/* Buyerga ma'lumoti kiritilgan shaxsning rasmi joylanadi */}
                </div>
                <div className="p-4 flex flex-col gap-1 text-[11px] sm:text-[17px] md:text-[11px] lg:text-lg xl:text-sm">
                  <p><span className="font-bold">Ism:</span> {item.name}</p>
                  <p><span className="font-bold">Shahar:</span> {item.address.city}</p>
                  <p><span className="font-bold">Ko'cha:</span> {item.address.street}</p>
                  <p><span className="font-bold">Xonadon:</span> {item.address.zipcode}</p>
                  <p><span className="font-bold">Tel:</span> {item.phone}</p>
                  <p><span className="font-bold">Kasbi:</span> {item.profession}</p>
                </div>
              </button>
            ))
          }
          {
            filteredData !== null && filteredData.length === 0 && (
              <div className="text-center flex justify-center items-center text-red-600 font-semibold col-span-3">{result}</div>
            )
          }
          {
            filteredData && filteredData.length > 0 && (
              <div className="text-center flex justify-center items-center text-black font-semibold sm:col-span-1">{result}</div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App

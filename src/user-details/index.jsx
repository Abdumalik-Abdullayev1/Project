import { useLocation } from 'react-router-dom';

const UserDetails = () => {
  const { state } = useLocation();
  const { item } = state || {};
  const lat = 41.311081;
  const lng = 69.240562;

  if (!item) {
    return <div>No user data available</div>;
  }

  return (
    <div className='mb-20'>
      <div className='xl:flex my-5 px-5'>
        <div className='sm:flex gap-5 xl:gap-10'>
          <div className="w-full sm:w-[320px] md:w-[430px] lg:w-[400px] xl:w-[450px]">
            <img src={item.image} alt="Image" />  {/* Buyerga ma'lumoti kiritilgan shaxsning rasmi joylanadi */}
          </div>
          <div className="p-4 flex flex-col gap-1 md:gap-2 text-md sm:text-[16px] md:text-xl lg:text-lg xl:text-xl">
            <p><span className="font-bold">Ism:</span> {item.name}</p>
            <p><span className="font-bold">Familiya:</span> {item.lname}</p>
            <p><span className="font-bold">Otasining ismi:</span> {item.fullname}</p>
            <p><span className="font-bold">Tug'ilgan:</span> {item.birthday}</p>
            <p><span className="font-bold">Shahar:</span> {item.address.city}</p>
            <p><span className="font-bold">Ko'cha:</span> {item.address.street}</p>
            <p><span className="font-bold">Xonadon:</span> {item.address.zipcode}</p>
            <p><span className="font-bold">Tel:</span> {item.phone}</p>
            <p><span className="font-bold">Kasbi:</span> {item.profession}</p>
            <p><span className="font-bold">Korxona:</span> {item.company.name}</p>
            <p><span className="font-bold">Email:</span> {item.email}</p>
          </div>
        </div>
        <div className='px-2 text-justify xl:text-xl xl:w-2/5'>
          <p><p className="font-bold">Biografiya:</p> {item.address.suite}</p>
        </div>
      </div>
      <iframe
        width="100%"
        height="400"
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        className="rounded-xl shadow"
      />
    </div>
  );
};

export default UserDetails
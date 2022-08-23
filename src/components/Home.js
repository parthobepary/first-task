import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const [user, setUser] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetch("https://otif-server-dot-otif-mx.uc.r.appspot.com/access")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const onSubmit = (data) => {
    const value = data.searchValue;
    var result = user.filter((u) => u.username.includes(value));
    if(result.length === 0){
        alert('No search found');
        return;
    }
    setUser(result);
  };
  const showall = () => {
    fetch("https://otif-server-dot-otif-mx.uc.r.appspot.com/access")
      .then((res) => res.json())
      .then((data) => setUser(data));
  };
  return (
    <div className="mt-10">
      <div className="mb-10 flex justify-center">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="input input-bordered input-secondary w-full max-w-xs"
              {...register("searchValue")}
            />
            <input
              className="btn btn-primary mt-5"
              type="submit"
              value="Search your Result"
            />
          </form>
        </div>
        <div>
          <button onClick={showall} className="btn btn-secondary">
            Show all
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        {user.map((p) => {
          return (
            <div className="bg-gray-400 m-2 rounded-md p-4">
              <h1>email: {p.email}</h1>
              <h1>Username: {p.username}</h1>
              <h1>First name: {p.first_name}</h1>
              <h1>Last name: {p.last_name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { UserType } from "types/UserType";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import AdminUserCard from "../AdminUserCard";
import "./styles.css";

const List = () => {
  const [page, setPage] = useState<SpringPage<UserType>>();

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const params: AxiosRequestConfig = {
        url: "/users",
        method: "GET",
        withCredentials: true,
        signal: controller.signal,
      };

      const data = (await requestBackend(params)).data;
      setPage(data);
    })();
  }, []);

  return (
    <div className="admin-user-list-container">
      {page?.content.map((user) => (
        <div className="user-list" key={user.id}>
          <AdminUserCard user={user} />
        </div>
      ))}
    </div>
  );
};

export default List;

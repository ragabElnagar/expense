export const useGetUserInfo = () => {
  const { name, userId, isAuth, profile } =
    JSON.parse(localStorage.getItem("auth")) ?? {};
  return { name, userId, isAuth, profile };
};

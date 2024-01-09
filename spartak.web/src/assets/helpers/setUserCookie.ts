import { AuthData } from "../../api/identityRepository";

export const setUserCookie = ({ access_token = "", refresh_token = "", expires_in }: Partial<AuthData>) => {
  document.cookie = `access_token=${access_token};domain=${process.env.NEXT_PUBLIC_DOMAIN};path=/;max-age=${expires_in}`;
  if (refresh_token) setRefreshToken(refresh_token);
  if (expires_in) setExpiresIn(expires_in);
};

export const clearUserCookie = () => {
  document.cookie = `access_token="";domain=${process.env.NEXT_PUBLIC_DOMAIN};path=/;max-age=-1`;
  document.cookie = `refresh_token="";domain=${process.env.NEXT_PUBLIC_DOMAIN};path=/;max-age=-1`;
};

const setRefreshToken = (refresh_token: string) => {
  document.cookie = `refresh_token=${refresh_token};domain=${process.env.NEXT_PUBLIC_DOMAIN};path=/;max-age=${604800}`;
};

const setExpiresIn = (expires_in: number) => {
  const value = expires_in > 60 ? expires_in - 60 : expires_in;
  document.cookie = `expires_in=${new Date(value * 1000 + Date.now()).toISOString()};domain=${
    process.env.NEXT_PUBLIC_DOMAIN
  };path=/;max-age=${expires_in}`;
};

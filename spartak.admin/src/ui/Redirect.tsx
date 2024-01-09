import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  path: string;
}

export const Redirect = ({ path }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, []);

  return null;
};

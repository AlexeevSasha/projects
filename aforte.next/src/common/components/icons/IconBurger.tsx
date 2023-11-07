// Используется в хедере в кнопке категории
type Props = {
  size?: "sm" | "md";
};

export const IconBurger = (props: Props) => {
  switch (props.size) {
    case "sm": {
      return (
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 1.33464C0 0.690303 0.522334 0.167969 1.16667 0.167969H12.8333C13.4777 0.167969 14 0.690303 14 1.33464C14 1.97897 13.4777 2.5013 12.8333 2.5013H1.16667C0.522335 2.5013 0 1.97897 0 1.33464ZM0 6.0013C0 5.35697 0.522334 4.83464 1.16667 4.83464H12.8333C13.4777 4.83464 14 5.35697 14 6.0013C14 6.64563 13.4777 7.16797 12.8333 7.16797H1.16667C0.522335 7.16797 0 6.64563 0 6.0013ZM1.16667 9.5013C0.522334 9.5013 0 10.0236 0 10.668C0 11.3123 0.522333 11.8346 1.16667 11.8346H8.16667C8.811 11.8346 9.33333 11.3123 9.33333 10.668C9.33333 10.0236 8.811 9.5013 8.16667 9.5013H1.16667Z"
            fill="white"
          />
        </svg>
      );
    }
    case "md": {
      return (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.92969"
            y="4.5"
            width="21"
            height="3"
            rx="1.5"
            fill="white"
          />
          <rect
            x="1.92969"
            y="10.5"
            width="21"
            height="3"
            rx="1.5"
            fill="white"
          />
          <rect
            x="1.92969"
            y="16.5"
            width="13.5"
            height="3"
            rx="1.5"
            fill="white"
          />
        </svg>
      );
    }
    default: {
      return null;
    }
  }
};

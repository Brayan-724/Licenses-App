import styled from "styled-components";
import tw from "twin.macro";

const LoadingText = styled.div/*css*/`
  & {
    animation: loading-text-animation 5s ease-in infinite;
  }

  &:before {
    content: "Loading";

    animation: loading-text-animation-before 2s infinite steps(4);
  }

  @keyframes loading-text-animation {
    0% {
      color: #fff;
      transform: scale(1);
    }

    50% {
      color: #fff2;
      transform: scale(1.2);
    }
  }

  @keyframes loading-text-animation-before {
    0% {
      content: "Loading";
    }

    25% {
      content: "Loading.";
    }

    50% {
      content: "Loading..";
    }

    75% {
      content: "Loading...";
    }
  }
`;

export function LoadingLayout() {
  return (
    <div className="fixed flex justify-center items-center inset-0 z-[9999] bg-black">
      <div className="text-white text-5xl">
        <LoadingText />
      </div>
    </div>
  );
}

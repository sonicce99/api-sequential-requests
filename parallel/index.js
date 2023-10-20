const render = () => {
  const $button = document.getElementById("button");
  $button.addEventListener("click", () => {
    onClick();
  });
};

render();

const apiRequest = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`${request} 에러!`));
    }, 300);
  });
};

const onClick = async () => {
  const requests = [
    "최근 배송지 주소 가져오기",
    "사용가능한 적립금 가져오기",
    "주문 반품 환불 내역 가져오기",
  ];
  const promises = requests.map((request) => apiRequest(request));
  const results = await Promise.allSettled(promises);

  results.forEach((result) => {
    const { status, reason } = result;

    if (status === "rejected") {
      alert(reason);
    }
  });
};

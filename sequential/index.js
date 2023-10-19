const render = () => {
  const $button = document.getElementById("button");
  $button.addEventListener("click", () => {
    onClick(`1. 최근 배송지 주소 가져오기`);

    // 0.3초 후 다른 여러 api 요청이 queue에 enqueue된다고 가정.
    setTimeout(() => {
      apiQueue.push(`2. 사용가능한 적립금 가져오기`);
      apiQueue.push(`3. 주문, 반품, 환불 내역 가져오기`);
    }, 300);
  });
};

render();

const apiQueue = [];
let jwt = `이것은 잘못된 JWT`;

const apiRequest = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (jwt === "이것은 잘못된 JWT") {
        reject(new Error(`${request} 에러!`));
      } else {
        resolve(`${request} 성공!`);
      }
    }, 500);
  });
};

const sequentialRequests = async () => {
  try {
    const req_path = apiQueue[0];
    await apiRequest(req_path);
    alert(`success ${req_path}`);
    // api 요청 성공 시 dequeue.
    apiQueue.shift();

    if (apiQueue.length > 0) {
      sequentialRequests();
    }
  } catch (error) {
    alert(error + ` JWT를 다시 받아오겠습니다.`);
    jwt = `이것은 정상적인 JWT`;

    if (apiQueue.length > 0) {
      sequentialRequests();
    }
  }
};

const onClick = async (path) => {
  apiQueue.push(path);

  // 최초 요청이 들어왔을 때만 순차 요청 함수 실행.
  if (apiQueue.length === 1) {
    sequentialRequests();
  }
};

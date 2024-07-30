// @ts-ignore
const body = document.querySelector('body') as HTMLBodyElement;

if (!window.navigator.onLine) {
    const alert = document.createElement('div') as HTMLDivElement;
    alert.className = 'alert-network network-error';
    alert.id = 'start-error-network';
    alert.textContent = 'Соединение с интернетом отсутсвует';
    body.prepend(alert);
};

body.onoffline = () => {
  const alert = document.createElement('div') as HTMLDivElement;
  alert.className = 'alert-network network-error';
  alert.id = 'error-network';
  alert.textContent = 'Соединение с интернетом потеряно.';
  body.prepend(alert);
};

body.ononline = () => {
    const alertNetwork = document.querySelector('#error-network') as HTMLDivElement;
    const alertStartErrorNetwork = document.querySelector('#start-error-network') as HTMLDivElement;
    if (alertStartErrorNetwork) {
        alertStartErrorNetwork.classList.remove('network-error');
        alertStartErrorNetwork.classList.add('network-success');
        alertStartErrorNetwork.textContent = 'Соединение с интернетом восстановлено.';
        setTimeout(() => alertStartErrorNetwork.remove(), 2000);
    }
    if (alertNetwork) {
        alertNetwork.classList.remove('network-error');
        alertNetwork.classList.add('network-success');
        alertNetwork.textContent = 'Соединение с интернетом восстановлено.';
        setTimeout(() => alertNetwork.remove(), 2000);
    }
};

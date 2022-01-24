(function IIFE() {
  let reportHoursPs = document.querySelectorAll(".report-hours__p");
  let reportLastWeekPs = document.querySelectorAll(".report-last-week__p");
  let reportMenuLinks = document.querySelectorAll(".reports-time a");

  let dataJsonFileLink =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;

  dataJsonFileLink =
    dataJsonFileLink.slice(0, dataJsonFileLink.lastIndexOf("/")) + "/data.json";

  fetch(dataJsonFileLink)
    .then((response) => response.json())
    .then((data) => {
      reportHoursPs.forEach((p, index) => {
        p.innerHTML = `
        <span>${data[index].timeframes.daily.current}hrs</span>
        <span>${data[index].timeframes.weekly.current}hrs</span>
        <span>${data[index].timeframes.monthly.current}hrs</span>
        `;
      });

      reportLastWeekPs.forEach((p, index) => {
        p.innerHTML = `Last Week - 
        <span>${data[index].timeframes.daily.previous}hrs</span>
        <span>${data[index].timeframes.weekly.previous}hrs</span>
        <span>${data[index].timeframes.monthly.previous}hrs</span>
        `;
      });
    });

  reportMenuLinks.forEach((link, linkIndex) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      reportMenuLinks.forEach((linkAgain) => {
        linkAgain.classList.remove("active");
      });

      link.classList.add("active");

      if (linkIndex === 0) {
        reportHoursPs.forEach((p) => {
          p.className = "report-hours__p hourly";
        });
        reportLastWeekPs.forEach((p) => {
          p.className = "report-last-week__p hourly";
        });
      }

      if (linkIndex === 1) {
        reportHoursPs.forEach((p) => {
          p.className = "report-hours__p weekly";
        });
        reportLastWeekPs.forEach((p) => {
          p.className = "report-last-week__p weekly";
        });
      }

      if (linkIndex === 2) {
        reportHoursPs.forEach((p) => {
          p.className = "report-hours__p monthly";
        });
        reportLastWeekPs.forEach((p) => {
          p.className = "report-last-week__p monthly";
        });
      }
    });
  });
})();

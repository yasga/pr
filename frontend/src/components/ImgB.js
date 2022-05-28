import React from 'react';
import "./ImgB.css";

const ImgB = () => {
    return (
        <><div className="banner container-fluid p-0">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
         
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={process.env.PUBLIC_URL + '/canape1.jpg'} className="d-block w-100 img" alt="slider" />
            </div>
            <div class="carousel-item">
              <img src={process.env.PUBLIC_URL + '/bureau3.jpg'} className="d-block w-100 img" alt="slider" />
            </div>
            <div class="carousel-item">
              <img src={process.env.PUBLIC_URL + '/table3.jpg'} className="d-block w-100 img" alt="slider" />
            </div>
          </div>
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div><script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
        </script><script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
          integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
        </script><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
          integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
        </script></>
    );
};
export default ImgB;
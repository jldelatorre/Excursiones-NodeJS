const getListado = () => {
    axios.get('/api/excursion')
  .then(function (response) {
    // handle success
    response.data.excursiones.forEach(element => {
        console.log(element);
        $('#listado_excursiones').append(
        `<div class="col-12 col-md-6 col-lg-4">
            <div class="single-blog-post mb-100">
                <div class="post-thumbnail mb-30">
                    <a href="/detalles?ID=${element._id}"><img src="${element.img[0]}" alt=""></a>
                </div>
                <div class="post-content">
                    <a href="single-post.html" class="post-title">
                        <h5>${element.title}</h5>
                    </a>
                    <div class="post-meta">
                        <a href="#"><i class="fa fa-clock-o" aria-hidden="true"></i> 20 Jun 2018</a>
                        <a href="#"><i class="fa fa-user" aria-hidden="true"></i> Alan Jackson</a>
                    </div>
                    <p class="post-excerpt">${element.description}.</p>
                </div>
            </div>
        </div>`)
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

const getExcursion = (id) => {
    axios.get(`api/excursion/id?ID=${id}`)
        .then(function (response) {
        // handle success
        $('#blog-image1').attr("src",`${response.data.excursion.img[0]}`);
        $('#blog-image2').attr("src",`${response.data.excursion.img[1]}`);
        
        console.log(el);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}
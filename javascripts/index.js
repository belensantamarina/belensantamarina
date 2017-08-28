/* globals Vue, axios, ga */
/* exported app, scroll */

var app = new Vue({
  el: '#app',
  data: {
    menu: {
      items: [
        { id: 'works', name: 'Obras' },
        { id: 'biography', name: 'Biografía' },
        { id: 'contact', name: 'Contacto' }
      ],
      active: false
    },
    works: [
      {
        name: 'Abstracción²',
        category: 'Instalación',
        description: '<strong>2017</strong> La obra toma como referencia los textos de Oskar Schlemmer y su obra Triadisches Ballet (Ballet Triádico). En la misma número tres está representado por tres variables, el color, la figura geométrica y su disposición. En cuanto al color, están presentes el blanco, el negro y el rosado. A la vez, son tres las figuras geométricas representadas, el cuadrado, el triángulo y el círculo. Con respecto a su disposición, la obra esta compuesta por tres filas y tres columnas.',
        details: '',
        cover: [
          { src: '/images/works/abstraccion/0.png', align: 'right' },
          { src: '/images/works/abstraccion/1.png', align: 'right' },
          { src: '/images/works/abstraccion/2.png', align: 'right' }
        ]
      },
      {
        name: '365 Geometrical Days',
        category: 'Retrospectiva',
        description: '<strong>2017</strong> Casi un año después de haber finalizado el proyecto 365 Geometrical Days y en forma de retrospectiva del camino recorrido se desarrollan una serie de obras que incluyen micro-esculturas, dibujos y pinturas creadas en torno a las experiencias vividas en torno a la exposición de la obra.',
        details: '',
        cover: [
          { src: '/images/works/365-retrospective/0.png', align: 'right' },
          { src: '/images/works/365-retrospective/1.png', align: 'right' },
          { src: '/images/works/365-retrospective/2.png', align: 'right' }
        ],
        conected: true
      },
      {
        name: '',
        category: '',
        description: '',
        details: '',
        cover: [
          { src: '/images/works/365-retrospective/3.png', align: 'center' },
          { src: '/images/works/365-retrospective/4.png', align: 'center' },
          { src: '/images/works/365-retrospective/5.png', align: 'center' }
        ]
      },
      {
        name: 'The Big Picture',
        category: 'Pintura',
        description: '<strong>2017</strong> La obra se encuadra dentro del minimalismo geométrico, al disponer sus partes en distintas posiciones se obtienen diversas obras y diversas lecturas de la misma.',
        details: '<em>Materiales: Pintura acrílica y diversos materiales sobre papel algodón 400 gr.</em> <em>Medidas: 70 x 85 cm.</em>',
        cover: [
          { src: '/images/works/the-big-picture/0.png', align: 'right' },
          { src: '/images/works/the-big-picture/1.png', align: 'right' },
          { src: '/images/works/the-big-picture/2.png', align: 'right' }
        ]
      },
      {
        name: 'Balance I y II',
        category: 'Escultura',
        description: '<strong>2016</strong> Cada cúpula, dentro de su fragilidad, guarda un significado único e inalterable al paso del tiempo. A través de estas esculturas se busca generar un alfabeto que al conjugar las pequeñas piezas que las componen, plasman un poema visual.',
        details: '<em>Materiales: Madera, cartón, pintura acrílica, laca sintética.</em> <em>Medidas: Cada una de 12 x 18 x 12 cm.</em>',
        cover: [
          { src: '/images/works/balance/0.png', align: 'right' },
          { src: '/images/works/balance/1.png', align: 'right' }
        ]
      },
      {
        name: '365 Geometrical Days',
        category: 'Obra Temporal',
        description: '<strong>2015 - 2016</strong> El proyecto nace el 1 de agosto de 2015 con la idea de crear una pequeña pieza de arte todos los días durante un año. La obra está comprendida por la creación y difusión de 365 micro-esculturas, cada una de ellas correspondiendo al día específico en el cual fue concebida.',
        details: '',
        cover: [
          { src: '/images/works/365-geometrical-days/0.png', align: 'right' },
          { src: '/images/works/365-geometrical-days/1.png', align: 'right' },
          { src: '/images/works/365-geometrical-days/2.png', align: 'right' }
        ],
        conected: true
      },
      {
        name: '',
        category: '',
        description: 'Acompañando la creación de las piezas y complementando a la narrativa del proyecto, cada micro-escultura fue fotografiada en su propio escenario y difundida a través de redes sociales logrando de esta forma generar una mirada lúdica y literal en torno a cada una de las creaciones.',
        details: '',
        cover: [
          { src: '/images/works/365-geometrical-days/3.png', align: 'left' },
          { src: '/images/works/365-geometrical-days/4.png', align: 'left' },
          { src: '/images/works/365-geometrical-days/5.png', align: 'left' }
        ],
        mirrored: true,
        conected: true
      },
      {
        name: '',
        category: '',
        description: '',
        details: '',
        cover: [
          { src: '/images/works/365-geometrical-days/6.png', align: 'center' },
          { src: '/images/works/365-geometrical-days/7.png', align: 'center' },
          { src: '/images/works/365-geometrical-days/8.png', align: 'center' }
        ]
      },
      {
        name: 'Hats',
        category: 'Escultura',
        description: '<strong>2014</strong> La obra corresponde a cinco sombreros geométricos y a su fotografía.',
        details: '<em>Materiales: Cartón, pintura acrílica, tela, barniz sintético.</em> <em>Fotografía: Nik Lanús.</em>',
        cover: [
          { src: '/images/works/hats/0.png', align: 'right' }
        ],
        conected: true
      },
      {
        name: '',
        category: '',
        description: '',
        details: '',
        cover: [
          { src: '/images/works/hats/1.png', align: 'center' },
          { src: '/images/works/hats/2.png', align: 'center' },
          { src: '/images/works/hats/3.png', align: 'center' }
        ]
      }
    ],
    contact: {
      name: '',
      email: '',
      message: '',
      status: '',
      submit: 'Enviar'
    }
  },
  computed: {
    contact_form_valid: function () {
      var email_regex = /.+@.+\..+/i;
      if (this.contact.name.length > 4 || email_regex.test(this.email) || this.contact.message.length > 8) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    send_message: function () {
      var that = this;
      if (that.contact_form_valid) {
        that.contact.status = 'loading';
        that.contact.submit = 'Enviando...';
        axios.post('/contact.php', {
          name: that.contact.name,
          email: that.contact.email,
          message: that.contact.message
        })
        .then(function (response) {
          window.console.log(response);
          ga('send', 'event', 'contact', 'submitted');
          that.contact.status = 'success';
          that.contact.submit = 'Enviado :)';
          window.alert('¡Muchas gracias por ponerse en contacto! Su mensaje fue enviado con éxito, le responderemos a la brevedad.');
          that.contact.name = '';
          that.contact.email = '';
          that.contact.message = '';
        })
        .catch(function (error) {
          ga('send', 'event', 'contact', 'failed', error);
          that.contact.status = 'error';
          that.contact.submit = 'No enviado :(';
          window.alert('Ha ocurrido un error al enviar su mensaje, vuelva a intentarlo en unos momentos.');
        });
        window.setTimeOut(function() {
          that.contact.status = '';
          that.contact.submit = 'Enviar';
        }, 5000);
      } else {
        window.alert('Por favor, revise que los datos del mensaje estén completos y su dirección de correo electrónico sea correcta.');
      }
    }
  }
});
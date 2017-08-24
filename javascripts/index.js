/* globals Vue, axios */
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
        name: 'Abstracción',
        category: 'Instalación',
        description: '<strong>2017</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra vehicula velit tincidunt facilisis. Phasellus aliquam varius mollis. Phasellus rhoncus neque nec tempor pulvinar. Vivamus nunc tortor, sollicitudin vel interdum nec, vulputate eu turpis.',
        cover: [
          { src: '/images/works/abstraccion/0.png', align: 'right' },
          { src: '/images/works/abstraccion/1.png', align: 'right' },
          { src: '/images/works/abstraccion/2.png', align: 'right' }
        ]
      },
      {
        name: 'Retrospectiva',
        category: '365 Geometrical Days',
        description: '<strong>2017</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra vehicula velit tincidunt facilisis. Phasellus aliquam varius mollis. Phasellus rhoncus neque nec tempor pulvinar. Vivamus nunc tortor, sollicitudin vel interdum nec, vulputate eu turpis.',
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
        cover: [
          { src: '/images/works/365-retrospective/3.png', align: 'center' },
          { src: '/images/works/365-retrospective/4.png', align: 'center' },
          { src: '/images/works/365-retrospective/5.png', align: 'center' }
        ]
      },
      {
        name: 'The Big Picture',
        category: 'Pintura',
        description: '<strong>2017</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra vehicula velit tincidunt facilisis. Phasellus aliquam varius mollis. Phasellus rhoncus neque nec tempor pulvinar. Vivamus nunc tortor, sollicitudin vel interdum nec, vulputate eu turpis.',
        cover: [
          { src: '/images/works/the-big-picture/0.png', align: 'right' },
          { src: '/images/works/the-big-picture/1.png', align: 'right' },
          { src: '/images/works/the-big-picture/2.png', align: 'right' }
        ]
      },
      {
        name: 'Balance',
        category: 'Escultura',
        description: '<strong>2016</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra vehicula velit tincidunt facilisis. Phasellus aliquam varius mollis. Phasellus rhoncus neque nec tempor pulvinar. Vivamus nunc tortor, sollicitudin vel interdum nec, vulputate eu turpis.',
        cover: [
          { src: '/images/works/balance/0.png', align: 'right' },
          { src: '/images/works/balance/1.png', align: 'right' }
        ]
      },
      {
        name: '365 Geometrical Days',
        category: 'Escultura',
        description: '<strong>2015</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra vehicula velit tincidunt facilisis. Phasellus aliquam varius mollis. Phasellus rhoncus neque nec tempor pulvinar. Vivamus nunc tortor, sollicitudin vel interdum nec, vulputate eu turpis.',
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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra vehicula velit tincidunt facilisis. Phasellus aliquam varius mollis. Phasellus rhoncus neque nec tempor pulvinar. Vivamus nunc tortor, sollicitudin vel interdum nec, vulputate eu turpis.',
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
        cover: [
          { src: '/images/works/365-geometrical-days/6.png', align: 'center' },
          { src: '/images/works/365-geometrical-days/7.png', align: 'center' },
          { src: '/images/works/365-geometrical-days/8.png', align: 'center' }
        ]
      },
      {
        name: 'Hats',
        category: 'Escultura',
        description: '<strong>2014</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra vehicula velit tincidunt facilisis. Phasellus aliquam varius mollis. Phasellus rhoncus neque nec tempor pulvinar. Vivamus nunc tortor, sollicitudin vel interdum nec, vulputate eu turpis.',
        cover: [
          { src: '/images/works/hats/0.png', align: 'right' }
        ],
        conected: true
      },
      {
        name: '',
        category: '',
        description: '',
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
          that.contact.status = 'success';
          that.contact.submit = 'Enviado :)';
          window.alert('¡Muchas gracias por ponerse en contacto! Su mensaje fue enviado con éxito, le responderemos a la brevedad.');
          that.contact.name = '';
          that.contact.email = '';
          that.contact.message = '';
        })
        .catch(function (error) {
          window.console.log(error);
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
<template>
  <div id="drawing" ref="drawing"></div>
</template>

<script>

export default {
  props: {
    widthCadre: Number,
    heightCadre: Number,
    rect: Boolean,
    poly: Boolean,
    circle: Boolean,
    isDrawing: Boolean
  },
  watch: {
    isDrawing: function (newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      if (newVal) {
        //initialise le canva pour dessiner
        this.draw()

      }
      else {
        //supprimer le canva
      }
    }
  },
  data() {
    return {
      SVG: "",
      drawing : "",
    }
  },
  computed: {},
  methods: {
    emitCircle(cx, cy, cr) {
      let x = this.widthCadre / (cx - cr)
      let y = this.heightCadre / (cy - cr)
      let rw = this.widthCadre / (cr * 2)
      let rh = this.heightCadre / (cr * 2)
      this.$emit("newCircle", x, y, rw, rh)
    },
    emitRect(rx, ry, rw, rh) {
      let x = this.widthCadre / rx
      let y = this.heightCadre / ry
      let w = this.widthCadre / rw
      let h = this.heightCadre / rh
      this.$emit("newRect", x, y, w, h)
    },
    emitPoly(array,px,py,pw,ph) {
      let x = this.widthCadre / px
      let y = this.heightCadre / py
      let w = this.widthCadre / pw
      let h = this.heightCadre / ph
      this.$emit("newPoly",array,x,y,w,h)
    },
    draw: async function () {//appelé ce truc quand on clique sur un bouton dans le bidule cadre

      let toto = this;

      if (this.circle) {
        let circle = this.drawing.circle().draw();

        this.drawing.on('mousedown', function(e){
          circle.draw(e);
        }, false);

        this.drawing.on('mouseup', function(e){
          circle.draw('stop', e);
        }, false);

        circle.on('drawstop', function (event) {
          let cx = event.srcElement.cx.baseVal.value;
          let cy = event.srcElement.cy.baseVal.value;
          let cr = event.srcElement.r.baseVal.value;
          toto.emitCircle(cx, cy, cr)
          toto.drawing.clear()

          // remove listener
        });
      } else if (this.rect) {
        let rect = this.drawing.rect()

        this.drawing.on('mousedown', function(e){
          rect.draw(e);
        }, false);

        this.drawing.on('mouseup', function(e){
          rect.draw('stop', e);
        }, false);

        rect.on('drawstop', function () {
          let rx = event.srcElement.x.baseVal.value;
          let ry = event.srcElement.y.baseVal.value;
          let rw = event.srcElement.width.baseVal.value;
          let rh = event.srcElement.height.baseVal.value;
          toto.emitRect(rx,ry,rw,rh)
          toto.drawing.clear()
          // remove listener
        });
      }
      else if (this.poly) {
        let poly = this.drawing.polygon().draw({snapToGrid:20});
        poly.on('drawstart', function(){
          document.addEventListener('keydown', function(e){
            if(e.keyCode === 13){
              poly.draw('done');
              poly.off('drawstart');
            }
          });
        });

        poly.on('drawstop', function(event){
          console.log(event.srcElement.getBBox())
          let x = event.srcElement.getBBox().x
          let y = event.srcElement.getBBox().y
          let w = event.srcElement.getBBox().width
          let h = event.srcElement.getBBox().height
          toto.emitPoly(event.srcElement.animatedPoints,x,y,w,h)
          //toto.drawing.clear()
        });
      }

    }
  },
  async mounted() {
    this.SVG = await this.$SVG;
    this.drawing = this.SVG(this.$refs.drawing).size(this.widthCadre, this.heightCadre);
  }
};

</script>

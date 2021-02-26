<template>
  <div ref="drawing"></div>
</template>

<script>

export default {
  props: {
    widthCadre: Number,
    heightCadre: Number,
    rect: Boolean,
    poly: Boolean,
    circle: Boolean,
  },
  computed : {

  },
  async mounted() {
    let SVG = await this.$SVG;
    let draw = SVG(this.$refs.drawing).size(this.widthCadre,this.heightCadre);
    //let rect = draw.rect(100, 100).fill("#f06");
    //rect.selectize().resize();
    draw.on('mouseup', function(event){
      console.log("HEY HEY HEY")
      console.log(event)
    });

    let poly = draw.polygon().draw({snapToGrid:20});
    poly.on('drawstart', function(){
      document.addEventListener('keydown', function(e){
        if(e.keyCode === 13){
          poly.draw('done');
          poly.off('drawstart');
        }
      });
    });

    poly.on('drawstop', function(){
      // remove listener
    });

  }
};

</script>

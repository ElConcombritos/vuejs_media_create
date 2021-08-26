<!-- SERT A RIEN JE CROIS -->
<template>
  <nav id="toolbar" class="nav-toolbar">
    <!-- 	<div class="ql-toolbar ql-snow"> -->
    <span class="ql-formats">
			<select class="ql-font">
				<option value="sans-serif">Sans Serif</option>
				<option value="serif">Serif</option>
				<option value="monospace">Monospace</option>
			</select>
		</span>

    <span class="ql-formats">
			<select class="ql-size">
				<option value="small">Small</option>
				<option selected>Normal</option>
				<option value="large">Large</option>
			</select>
    	</span>

    <span class="ql-formats">
			<select class="ql-color" title="Colour">
				<option value="rgb(255,0,0)" />
				<option value="rgb(0,255,0)" selected />
				<option value="rgb(0,0,255)" />
			</select>
		</span>

    <span class="ql-formats">
			<button class="ql-bold" id="bold" onclick="onBoldClick()">
				<span class="fa fa-bold"></span>
		</button>
		<button class="ql-italic" id="italic" onclick="onItalicClick()">
				<span class="fa fa-italic"></span>
			</button>
		<button class="ql-underline" id="underline" onclick="onUnderlineClick()">
				<span class="fa fa-underline"></span>
			</button>
		<button class="ql-strike" id="strike" onclick="onStrikeClick()">
				<span class="fa fa-strikethrough"></span>
			</button>
		</span>

    <span class="ql-formats">
			<button class="ql-align-left" id="align-left" onclick="onAlignLeftClick()">
				<span class="fa fa-align-left"></span>
		</button>
		<button class="ql-align-right" id="align-right" onclick="onAlignRightClick()">
				<span class="fa fa-align-right"></span>
			</button>
		<button class="ql-align-center" id="align-center" onclick="onAlignCenterClick()">
				<span class="fa fa-align-center"></span>
			</button>
		<button class="ql-align-justify" id="align-justify" onclick="onAlignJustifyClick()">
				<span class="fa fa-align-justify"></span>
			</button>
		</span>

    <span class="ql-formats">
			<button type="button" class="ql-list" value="bullet" onclick="onListULClick()">
				<span class="fa fa-list"></span>
			</button>
			<button type="button" class="ql-list" value="ordered" onclick="onListOLClick()">
				<span class="fa fa-list-ol"></span>
			</button>
		</span>

    <span class="ql-formats">
			<button type="button" class="ql-blockquote" value="blockquote" onclick="onBlockquoteClick()">
				<span class="fa fa-quote-right"></span>
			</button>
		</span>
    <!-- 	</div> -->
  </nav>

  <br><br>

  <section class="row">
    <div class="col-md-6">
      <h2 class="h4 text-center">Editor #1</h2>
      <div id="editor1">
        <p>Hello World!</p>
        <p>Some initial <strong>bold</strong> text</p>
        <p>Some <em>lorem ipsum</em> text</p>
      </div>
    </div>
    <div class="col-md-6">
      <h2 class="h4 text-center">Editor #2</h2>
      <div id="editor2">
        <p>Hello World! 2</p>
        <p>Some initial <strong>bold</strong> text</p>
        <p>Some lorem ipsum text</p>
      </div>
    </div>
  </section>

  <br><br>

  <section class="row">
    <div class="col-md-6">
      <h2 class="h4 text-center">Editor #3</h2>
      <div id="editor3">
        <p>Hello World! 3</p>
        <p>Some initial <strong>bold</strong> text</p>
        <p>Some <em>lorem ipsum</em> text</p>
      </div>
    </div>
    <div class="col-md-6">
      <h2 class="h4 text-center">Editor #4</h2>
      <div id="editor4">
        <p>Hello World! 4</p>
        <p>Some initial <strong>bold</strong> text</p>
        <p>Some lorem ipsum text</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "dfbg"
}
</script>

<style scoped>

</style>

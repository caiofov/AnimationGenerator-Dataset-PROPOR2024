<script lang="ts">
	import '$lib/assets/style.css';
	import { _ } from 'svelte-i18n';
</script>

<div id="container">
	<div id="header">
		<div>
			<h2><a href="/">{$_('about.page.title')}</a></h2>
			<p>{$_('about.page.content')} <a href="https://propor2024.citius.gal/"> (PROPOR 2024)</a></p>
			<small>Caio de F. Oliveira, Artur O. R. Franco, Wellington Franco, José G. R. Maia</small>
		</div>
		<div>
			<iframe
				title={$_('about.itchio.title')}
				frameborder="1"
				src="https://itch.io/embed/2431125?border_width=0&amp;bg_color=f6f8f8&amp;fg_color=636161&amp;link_color=0484d1&amp;border_color=8d8d8d"
				width="325"
				height="120"
			>
				<a href="https://caiofov.itch.io/animation-generator-dataset"
					>A Natural Language Text to Role-Playing Game Animation Generator by caiofov
				</a>
			</iframe>
		</div>
	</div>

	<slot />
</div>

<style>
	#container {
		width: 90vw;
		justify-content: center;
		margin-left: 5vw;
		margin-right: 5vw;
		margin-top: 3vh;
	}
	#header {
		display: flex;
		justify-content: space-between;
		padding: 1rem 2rem;
		background-color: rgb(250, 250, 250);
		margin-bottom: 3vh;
		border-bottom: #868585 solid 2px;
		border-radius: 10px;
		box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
	}
	h2 > a {
		text-decoration: none;
		color: var(--blue);
	}
	h2 > a:hover {
		text-decoration: underline;
	}
	iframe {
		border-radius: 20px;
		border: solid #939292;
	}
</style>

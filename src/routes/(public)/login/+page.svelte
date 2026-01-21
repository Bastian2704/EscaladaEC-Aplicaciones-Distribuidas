<script lang="ts">
	export let form: any;
	import logo from '$lib/assets/smallLogo.png';
	import '$lib/styles/login.css';
</script>

<section class="login-background">
	<section class="login-split">
		<!-- Lado izquierdo: logo y nombre -->
		<div class="login-left">
			<img class="logo-left" src={logo} alt="logo Urqu Ascents" />
			<h1 class="logo-text">Urqu Ascents</h1>
		</div>

		<!-- Lado derecho: login -->
		<div class="login-card">
			<h1 class="login-title">Iniciar sesión</h1>
			<p class="login-subtitle">Ingresa tus credenciales para continuar</p>

			<form method="POST" class="login-form">
				<label class="login-label">
					Email
					<input
						name="email"
						type="email"
						required
						placeholder="ejemplo@correo.com"
						class="login-input"
					/>
				</label>
				<label class="login-label">
					Contraseña
					<input
						name="password"
						type="password"
						required
						placeholder="••••••••"
						class="login-input"
					/>
				</label>

				{#if form?.message}
					<p class="login-message {form.success ? 'success' : 'error'}">{form.message}</p>
				{/if}

				<button type="submit" class="login-button">Entrar</button>
			</form>

			<p class="login-footer">
				¿No tienes cuenta? <a href="/register">Regístrate</a>
			</p>
		</div>
	</section>
</section>

<script lang="ts">
	export let form: any;
	import logo from '$lib/assets/smallLogo.png';
	import '$lib/styles/login.css'; 
</script>

<section class="login-background">
	<section class="login-split">
		<div class="login-left">
			<img class="logo-left" src={logo} alt="logo Urqu Ascents" />
			<h1 class="logo-text">Urqu Ascents</h1>
		</div>

		<div class="login-card">
			<h1 class="login-title">Crear cuenta</h1>
			<p class="login-subtitle">Ingresa tus datos para registrarte</p>

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
						minlength="8"
						required
						placeholder="••••••••"
						class="login-input"
					/>
				</label>
				<label class="login-label">
					Username
					<input
						name="username"
						type="text"
						required
						placeholder="Tu nombre de usuario"
						class="login-input"
					/>
				</label>
				<label class="login-label">
					Edad
					<input
						name="age"
						type="number"
						min="1"
						required
						placeholder="Tu edad"
						class="login-input"
					/>
				</label>

				{#if form?.message}
					<p class="login-message {form.success ? 'success' : 'error'}">{form.message}</p>
				{/if}

				<button type="submit" class="login-button">Registrarme</button>
			</form>

			<p class="login-footer">
				¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
			</p>
		</div>
	</section>
</section>

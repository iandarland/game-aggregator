import React, { useState, useEffect } from 'react';

function NavBar() {
	return (
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">
					Menu
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarColor01"
					aria-controls="navbarColor01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon" />
				</button>
				<div class="collapse navbar-collapse" id="navbarColor01">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">
								Home
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Genres
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Pricing
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								About
							</a>
						</li>
					</ul>
					<form class="d-flex">
						<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button class="btn btn-outline-light" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;

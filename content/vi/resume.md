---
title: ""
date: "2021-25-07"
aliases:
  - "about-us"
  - "contact"
author: "Nguyễn Khắc Thành"
published: true
---
<style>
#resume {
	font-size: 16px;
}

#resume > .title {
	text-align: center;
	font-size: 32px;
}

#resume > section {
	padding: 0 10px;
	margin-bottom: 50px;
	page-break-after: always;
}

#resume > section > h4 {
	font-size: 18px;
	margin-bottom: 15px;
	border-bottom: 1px solid gray;
}

#contact {
	display: flex;
	justify-content: space-between;
}

#work-experiences .exp h4 {
	margin-bottom: 5px;
}

#skills .skill h4 {
	margin-bottom: 0;
}
</style>
<article id="resume">
	<h3 class="title">Nguyen Khac Thanh</h3>
	<section id="contact">
		<div>
			<p>Nationality: Vietnamese</p>
			<p>Address: <a target="_blank" href="https://goo.gl/maps/RMTJxcaQxWt31WiL8">Hoai Duc District, Hanoi</a></p>
			<p>Date of Birth: <time datetime="1998-04-24">April 1998</time></p>
		</div>
		<address>
			<p>Skype: <a target="_blank" href="https://join.skype.com/invite/bFZVFCglRj0q">live:nguyenkhacthanh244</a></p>
			<p>Email: <a target="_blank" href="mailto:nguyenkhacthanh244@gmail.com">nguyenkhacthanh244@gmail.com</a></p>
			<p>Blog: <a target="_blank" href="https://nkthanh.dev">nkthanh.dev</a></p>
		</address>
	</section>
	<section id="about">
		<h4>About me</h4>
		<p>I studied Computer Science at the University of Engineering and Technology but I left the university since I didn’t finish my program, so I never have a BA degree. I have been a software developer for 3 years.</p>
		<p>I can communicate and read English documents. In my free time, I usually read Medium, review code on Github, learn new technology or improve my programming skills or write my blog.</p>
		<p>I can use Linux and toolsets for development, apply basic data structures and algorithms to resolve problems (heap, link list, hash map, sort, and so on…). I use Python as the main programming language and I can improve the python program by using C/C++ or Cython. I need a good environment for self-development.</p>
	</section>	
	<section id="work-experiences">
		<h4>Work experiences</h4>
		<div class="exp">
			<h4>06-2019 – 02-2021: <a href="https://teko.vn/">Teko Vietnam</a></h4>
			<strong>Main responsibilities</strong>
			<ul>
				<li>High-level design, write the document and implement product management module for the E-Commerce system</li>
				<li>Maintain and support infrastructure by using Kubernetes and related tools</li>
			</ul>
			<strong>Description</strong>
			<p>After 2 years, I applied to Teko Vietnam and I joined the catalog team. This is a product management system for the E-Commerce system. I have contributed to design product models and developed a microservice. My team has used Flask as the main framework. At this time, I improved skill programming and the high-level design system (data model, agile process, so on…). I also learned Docker and Kubernetes for development and deployment. By using utilities (docker, kubectl, gcloud, scaffold, telepresence …), I also understand the basic concepts and architecture of Kubernetes.</p>
		</div>
		<div class="exp">
			<h4>07-2017 – 06-2019: <a href="https://www.revotech.com.vn/">Revotech</a></h4>
			<strong>Main responsibilities</strong>
			<ul>
				<li>Design and develop the backend service for serving a machine learning system.</li>
				<li>Implement a clustering algorithm for oil prediction.</li>
				<li>Implement some machine learning algorithms that are based on papers of researchers.</li>
			</ul>
			<strong>Description</strong>
			<p>In the first position, I was a backend developer for a machine learning system in the lab of the university. I and my team developed a backend system for serving machine learning models. I learned the basic software process, python, web service concept, and so on.</p>
		</div>
	</section>
	<section id="projects">
		<h4>Projects</h4>
		<ul>
			<li><strong>pjrpc</strong>: Async JSON-RPC framework for Python, easy to use for everyone, <a href="https://github.com/magiskboy/pjrpc">checkout</a></li>
			<li><strong>Flask-Blog</strong>: Simple blog with OAuth2, written by Flask, <a href="https://github.com/magiskboy/flask-blog">checkout</a></li>
		</ul>
	</section>
	<section id="skills">
		<h4>Skills</h4>
		<div class="skill">
			<h4>Programming language</h4>
			<ul>
				<li>Python</li>
				<li>Javascript</li>
			</ul>
		</div>
		<div class="skill">
			<h4>Frameworks</h4>
			<ul>
				<li>The WSGI standards as Flask, Django, or ASGI standards as FastAPI,...</li>
				<li>The asynchronous library as asyncio, curio or gevent</li>
				<li>asyncpg, pymysql or SQLAlchemy</li>
				<li>ReactJS, NextJS, ExpressJS</li>
				<li>Webpack</li>
			</ul>
		</div>
		<div class="skill">
			<h4>Databases</h4>
			<ul>
				<li>MySQL</li>
				<li>PostgresSQL</li>
			</ul>
		</div>
		<div class="skill">
			<h4>Testing</h4>
			<ul>
				<li>Mocking</li>
				<li>unittest, jest, react-testing-library</li>
				<li>API testing with Postman</li>
			</ul>
		</div>
		<div class="skill">
			<h4>Tools</h4>
			<ul>
				<li>Linux</li>
				<li>Docker, Kubernetes</li>
				<li>OpenAPI</li>
			</ul>
		</div>
	</section>
	<section id="educations">
		<h4>Educations</h4>
		<div class="education">
			<h4>June 2019 - present</h4>
			<p>Learning Computer Science and Software development in Coursera and related platforms.</p>
			<p>You can view my profile in <a href="https://www.coursera.org/user/650bbf8164cf05a9c859c9f0f510bfd5">Coursera</a> or in <a href="https://www.freecodecamp.org/nguyen-khac-thanh">Freecodecamp</a>.</p>
		</div>
		<div class="education">
			<h4>Aug 2016 - June 2019</h4>
			<p>Studied Computer Communications and Networks at the University of Engineering and Technology.</p>
		</div>
	</section>
</article>

function UnknownLink() {
    return (
		<div className="p-2">
			<h1>
				Unknown Link, please try again with correct link with this format : {window.location.origin}
				<span className="font-bold">/yourURLcode</span> <br /> Or create a new
				one by clicking here:{" "}
				<a className="font-bold underline text-blue-700" href="/">
					Click ME
				</a>
			</h1>
		</div>
	);
}

export default UnknownLink;
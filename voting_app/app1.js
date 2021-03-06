class Product extends React.Component{
	constructor(props){
		super(props);
		this.handleUpVote = this.handleUpVote.bind(this);
	}
	handleUpVote(){
		this.props.onVote(this.props.id);
	}

	render(){
		return(
			<div className='item'>
			<div className='image'>
			<img src={this.props.product_image_url}/>
			</div>
				<div className='middle aligned content'>
				  <div className='header'>
				  	<a onClick={this.handleUpVote}><i className='large caret up icon'/></a>{this.props.votes}
				  </div>
					<div className='description'>
						<a href='{this.props.url}'>{this.props.title}</a>
						<p>{this.props.description}</p>
					</div>
					<div className='extra'>
						<span>Submitted by:</span>
						<img className='ui avatar image' src={this.props.submitter_avatar_url}/>
					</div>
				</div>
			</div>
		);
	}
}



class ProductList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			products: [],
		};
		this.handleProductUpVote = this.handleProductUpVote.bind(this);
	}

	componentDidMount(){
		const products = Data.sort((a, b) => {
      	return b.votes - a.votes;
    	});
    	this.setState({ products: products });
	}

	handleProductUpVote(product_id){
		const nextProducts = this.state.products.map((product) => {
			if(product.id===product_id){
				return Object.assign({},product, {votes: product.votes+1});
			}
			else{
				return product;
			}
		});

		this.setState({
			products: nextProducts,
		})
	}

	handleUpVote(product_id){
		console.log("product id= "+product_id);
	}

	render(){
		const products = this.state.products.sort((a,b) => (b.votes-a.votes));
		const productComponents = products.map((product) => (
				<Product key={'product-'+ product.id} id={product.id} title={product.title} description={product.description} url={product.url} votes={product.votes} submitter_avatar_url={product.submitter_avatar_url} product_image_url={product.product_image_url} onVote={this.handleProductUpVote}/>
		 
		));

		return(
			<div className='ui unstackable items'>
				{productComponents}
			</div>
		);
	}
}

ReactDOM.render(<ProductList/>, document.getElementById('content'));

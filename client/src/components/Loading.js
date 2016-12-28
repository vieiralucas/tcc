import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions';

const Loading = (props) => (
	<section className='hero is-fullheight is-dark is-bold is-loading'>
		LOADING>>>>>>>>>>>>>>>>>>>>>>>>
  </section>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);

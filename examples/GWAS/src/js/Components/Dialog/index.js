import React from 'react';

const Dialog = require('rc-dialog');

const style = {width: 400, margin: 50};

const information = 'The GWAS Catalog is provided jointly by the National Human Genome Research Institute (NHGRI) and the European Bioinformatics Institute (EMBL-EBI). The Catalog was founded by the NHGRI in 2008, with delivery and development of the Catalog being a collaborative project between the EMBL-EBI and NHGRI from September 2010 to the present. In March 2015 the Catalog infrastructure moved to EMBL-EBI to enable delivery of an improved user interface and curatorial infrastructure, funded by NHGRI Grant Number 1U41HG007823-01. The Catalog is a quality controlled, manually curated, literature-derived collection of all published genome-wide association studies assaying at least 100,000 SNPs and all SNP-trait associations with p-values 1.0 x 10-5 (Hindorff et al., 2009). For more details about the Catalog curation process and data extraction procedures, please refer to the Methods page. The Catalog also publishes the iconic GWAS diagram of all SNP-trait associations, with p-values ≤ 5.0 x 10-8, mapped onto the human genome by chromosomal locations and displayed on the human karyotype. The diagram is released nightly and the latest version of the diagram is made available on our website in SVG format.'

const InfoDialog = React.createClass({
  getInitialState() {
    return {
      visible: false,
      width: 600,
      destroyOnClose: false,
      center: false,
    };
  },

  onClick(e) {
    this.setState({
      mousePosition: {
        x: e.pageX,
        y: e.pageY,
      },
      visible: true,
    });
  },

  onClose(e) {
    this.setState({
      visible: false,
    });
  },

  onDestroyOnCloseChange(e) {
    this.setState({
      destroyOnClose: e.target.checked,
    });
  },


  center(e) {
    this.setState({
      center: e.target.checked,
    });
  },

  render() {
    let dialog;
    if (this.state.visible || !this.state.destroyOnClose) {
      const style = {
        width: this.state.width,
      };
      let wrapClassName = '';
      if (this.state.center) {
        wrapClassName = 'center';
      }
      dialog = (
        <Dialog
            visible={this.state.visible}
            wrapClassName={wrapClassName}
            animation="zoom"
            maskAnimation="fade"
            onClose={this.onClose}
            style={style}
            mousePosition={this.state.mousePosition}
            title={<div>Welcome to the GWAS Catalog Search Visualization</div>}
          >
          <p>{information}</p>
          <div style={{ height: 200 }}></div>
        </Dialog>
      );
    }
    return (
      <div style={{ width: '90%', margin: '0 auto' }}>
        <style>
          {
            `
            .center {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            `
          }
        </style>
        <p>
          <button
            className="btn btn-primary"
            onClick={this.onClick}
          >
            more info
          </button>

        </p>
        {dialog}
      </div>
    );
  },
});

export default InfoDialog
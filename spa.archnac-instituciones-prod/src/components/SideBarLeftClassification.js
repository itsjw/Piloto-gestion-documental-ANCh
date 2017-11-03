/**
 * Alberto ECM 
 * (c) 2017-10-03 18:27:42 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Tree, { TreeNode } from 'rc-tree'
import 'rc-tree/assets/index.css'
import { FormattedMessage } from 'react-intl'
import { routerGo, getChildren, getNodeRef, nodeRefToUri, TYPE_SIMPLE_UNIT } from 'alicia-common'
import { getTitle, getCod, getName, getAggrType, getNodeRefFromProps } from '../selectors/app'
import { condFUndef, isClfProps, isAuditProps } from '../services/commons'
import { fetchChildren, fetchSearchReverse, rcTreeExpandKeys } from '../actions'

class SideBarLeftClassification extends Component {
    
    constructor(props){
        super(props)
        this.onSelect = this.onSelect.bind(this)
        this.onLoadData = this.onLoadData.bind(this)
        this.onExpand = this.onExpand.bind(this)
    }

    toTreeNode(node, sep = '|-'){

        if(!node || getAggrType(node) === TYPE_SIMPLE_UNIT){
            return null
        }

        const { treeData, nodes } = this.props
        const nodeRef = getNodeRef(node)
        // prevenir que no tenga elementos cargados
        const children = treeData[nodeRef] || []
        console.log(`${sep}${nodeRef}`)
        
        const fullNode = nodes[nodeRef] || node
        return (
            <TreeNode key={ getNodeRef(node) } title={ `${getCod(fullNode)} ${getName(fullNode)}` }>
                { children.map(node => this.toTreeNode(node, `\t${sep}`)) }
            </TreeNode>
        )
    }

    onLoadData(treeNode){ 
        console.log('SideBarLeftClassification.onLoadData')
        return this.props.fetchChildren(treeNode.props.eventKey)
    }

    onSelect([ nodeRef ]){
        if(nodeRef){
            const { routerGo } = this.props
            const nodeRefUri = nodeRefToUri(nodeRef)
            routerGo(`/page/classification/${nodeRefUri}`)    
        }
    }

    onExpand(expandedKeys, { expanded, node }){
        const { rcTreeExpandKeys } = this.props
        rcTreeExpandKeys(expandedKeys)
    }

    render(){
        console.log('SideBarLeftClassification.render', this.props)
        const { rootAggr, treeData, selectedRef, expandedKeys } = this.props
        return (
            <section 
                id="sidebar" 
                className="toggled" 
                style={{ 
                    top: 121, height: 'calc(100% - 121px)', boxShadow: '0 0 1px 0px rgba(51, 51, 51, 0.38)'
                }}>
                    <div className="sidebar-inner c-overflow custom-scroll">  
                        <div className="p-t-10"> 
                            <Tree 
                                showLine 
                                onSelect={ this.onSelect } 
                                onExpand={ this.onExpand }
                                loadData={ this.onLoadData } 
                                selectedKeys={ condFUndef([ selectedRef ], selectedRef) }
                                expandedKeys={ expandedKeys }>
                                { this.toTreeNode(rootAggr) }
                            </Tree>
                        </div>
                    </div>
                }
            </section>
        )
    }

    componentDidMount(){
        console.log('SideBarLeftClassification.componentDidMount', this.props)
        const { selectedRef, rootAggrRef, fetchSearchReverse } = this.props
        if(!this.loadedReverse && rootAggrRef && selectedRef ){
            this.loadedReverse = true;
            fetchSearchReverse(rootAggrRef, selectedRef)
        }
    }

    componentWillUpdate(nextProps){
        const { selectedRef, fetchSearchReverse, rootAggrRef: nextRootAggrRef} = nextProps
        const { rootAggrRef: currRootAggrRef, selectedRef: currSelectedRef } = this.props

        // cargar primera vez /page/classification/:storeProtocol/:storeId/:uuid
        if(!this.loadedReverse && nextRootAggrRef && selectedRef && selectedRef !== nextRootAggrRef){
            this.loadedReverse = true;
            fetchSearchReverse(nextRootAggrRef, selectedRef)
        } 
        // cargar primera vez /page/classification
        else if(!selectedRef && nextRootAggrRef){

            // setTimeout(() => this.setState({ ...this.state, isLoading: false}))
        }

        // transicion /page/classification/:storeProtocol/:storeId/:uuid -> /page/classification/:storeProtocol/:storeId/:uuid
        else if(selectedRef !== currSelectedRef){
            // setTimeout(() => this.setState({ ...this.state, isLoading: false}))            
        }
    }
}

export default connect(
    (state, props) => ({ 
        nodes: state.archnac.nodes,
        rootAggr: state.archnac.rootAggr, 
        treeData: state.aggrTree.data,
        selectedRef: condFUndef(() => props.location.query.selectedRef || getNodeRefFromProps(props), isClfProps(props)),
        rootAggrRef: condFUndef(() => getNodeRef(state.archnac.rootAggr), state.archnac.rootAggr),
        expandedKeys: state.aggrTree.expandedKeys
    }), 
    { routerGo, fetchChildren, fetchSearchReverse, rcTreeExpandKeys }
)(SideBarLeftClassification) 
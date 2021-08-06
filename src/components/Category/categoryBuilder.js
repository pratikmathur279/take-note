import React from 'react';

import { FaRegStickyNote, FaRegStar, FaRegTrashAlt, FaRegFolder, FaPlus } from 'react-icons/fa';
import { BiNotepad } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

import { v4 as uuid } from 'uuid'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class CategoryBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            edit: true
        }
    }

    addCategory = () => {
        let state = Object.assign({}, this.state);
        let cat = {
            id: uuid(),
            name: ''
        }

        state.categories.push(cat);
        state.edit = true;
        state.editId = cat.id;
        console.log(state);
        this.setState(state)
    }

    closeEdit = () => {
        let state = Object.assign({}, this.state);
        state.categories.forEach(c => {
            if (c.id == state.editId && c.name == '') {
                state.categories.splice(state.categories.length - 1, 1);
            }
        });

        state.edit = false;
        state.editId = ''
        this.setState(state);
    }

    handleChange = (e) => {
        console.log(e.target.value);
        let state = Object.assign({}, this.state);
        state.categories.forEach(c => {
            if (c.id == state.editId) {
                c.name = e.target.value;
            }
        });

        this.setState(state);
    }

    render() {
        const buildList = (c) => {
            if (this.state.edit && c.id == this.state.editId) {
                return (
                    <div key={c.id} className="nav-item">
                        <input type="text" placeholder="New Category..." value={c.name} onChange={this.handleChange} onBlur={this.closeEdit} />
                        <MdClose onClick={this.closeEdit} />
                    </div>
                )
            }
            else {
                return (
                    <div key={c.id} className="nav-item">
                        <FaRegFolder />
                        <Link to={`/app/${c.name}`} >
                            <p>{c.name}</p>
                        </Link>
                    </div>
                )
            }

        }

        return (
            <div className="category-wrapper">
                <div className="category-header">
                    <h2>Categories</h2>
                    <FaPlus onClick={this.addCategory} />
                </div>
                <div className="nav-items" >
                    {this.state.categories.map(buildList)}
                </div>
            </div>

        );
    }
}

export default CategoryBuilder;
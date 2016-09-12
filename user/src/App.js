import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }


var Expense = React.createClass({
  render: function() {
    return (
         <tr>
             <td>{ this.props.date }</td>
             <td>{ this.props.time }</td>
             <td>{ this.props.children }</td>
             <td>{ this.props.cost }</td>
             <td> <input type="button"  className="btn btn-primary" value="Remove" onClick={this.props.onDelete({id: this.props.id, date: this.props.date, time: this.props.time, text: this.props.text, cost: this.props.cost})}/> </td>
        </tr>
    );
  }
});

var ExpensesList = React.createClass({
    handleExpenseRemove: function(e) {
        // var text = this.state.text.trim();
        // var date = this.state.date;
        // var time = this.state.time;
        // var cost = this.state.cost;
        // var id = this.state.id;
        this.props.onExpenseDelete(e);
    },
    render: function() {
        var that = this;
        var expenseNodes = this.props.data.map(function(expense) {
            return (
            <Expense date={expense.date} time={expense.time} cost={expense.cost} id={expense.id} onDelete={that.handleExpenseRemove}>
              {expense.text}
            </Expense>
          )
        });
        return (
          <div className="expensesList">
              <br/>
              <table>
                  <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Text</th>
                        <th>Cost</th>
                        <th></th>
                    </tr>
                    </thead>
                  <tbody>
                  {expenseNodes}
                  </tbody>
              </table>
          </div>
        );
      }
});


var ExpensesForm = React.createClass({
    getInitialState: function() {
        return {date: '', time: '', text: '', cost: ''};
    },
    handleDateChange: function(e) {
        this.setState({date: e.target.value});
    },
    handleTimeChange: function(e) {
        this.setState({time: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleCostChange: function(e) {
        this.setState({cost: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var text = this.state.text.trim();
        var date = this.state.date;
        var time = this.state.time;
        var cost = this.state.cost;
        if (!text || !date || !time || !cost) {
          return;
        }
        this.props.onExpenseSubmit({date: date, time: time, text: text, cost: cost});
        this.setState({date: '', time: '', text: '', cost: 0});
    },
    render: function() {
        return (
          <form className="expensesForm" onSubmit={this.handleSubmit} >
              <br/>
              <input type="date"
                   placeholder="Date"
                   value={this.state.date}
                   onChange={this.handleDateChange}/>
              <br/>
              <input type="time"
                   placeholder="Time"
                   value={this.state.time}
                   onChange={this.handleTimeChange}/>
              <br/>
              <input type="text"
                   placeholder="Say something..."
                   value={this.state.text}
                   onChange={this.handleTextChange}/>
              <br/>
              <input type="number"
                   placeholder="Cost"
                   value={this.state.cost}
                   onChange={this.handleCostChange}/>
              <br/>
              <input type="submit" value="Post" />
          </form>
    );
  }
});

var ExpensesBox = React.createClass({
    loadExpensesFromServer: function() {
        $.ajax({
          url: "/expenses/",
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.log(xhr);
          }
        });
      },
    handleExpenseSubmit: function(expense) {
        var expenses = this.state.data;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRFToken', readCookie('csrftoken'));
            },
            data: expense,
            success: function(data) {
                this.setState({data: expenses.concat(data)});
            },
            error: function(xhr, status, err) {
              console.log(xhr);
          }
        });
      },
    handleExpenseRemove: function(expense) {
          var index = -1;
          var elength = this.state.data.length;
          for(var i = 0; i < elength; i++) {
              if(this.state.data[i].id === expense.id) {
                  index = i;
                  break;
              }
          }
          var data = this.state.data[index];
          this.state.data.splice(index, 1);
          $.ajax({
            url: this.props.url+expense.id+'/',
            dataType: 'json',
              beforeSend: function(xhr) {
                  xhr.setRequestHeader('X-CSRFToken', readCookie('csrftoken'));
                },
            type: 'DELETE',
            data: data,
            success: function(data) {
                this.setState({data: this.state.data});
            },
            error: function(xhr, status, err) {
              console.log(xhr);
          }
        });
    },
    getInitialState: function() {
        return {data: []};
      },
    componentDidMount: function() {
        this.loadExpensesFromServer();
      },
    render: function() {
    return (
      <div className="App">
           <div className="App-header">
               <h1>Expenses</h1>
           </div>
          <div className="App-intro">
              <ExpensesList data={ this.state.data } onExpenseDelete={this.handleExpenseRemove.bind(this)}/>
              <ExpensesForm onExpenseSubmit={this.handleExpenseSubmit.bind(this)} />
          </div>
      </div>
    );
  }
});


export default ExpensesBox;

const express = require('express');
const app = express();

app.use(express.json());

const full_name = 'john_doe'; 
const dob = '17091999';       
const email = 'john@xyz.com'; 
const roll_number = 'ABCD123';
const user_id = `${full_name}_${dob}`;

app.post('/api/bfhl', (req, res) => {
  try {
    const data = req.body.data || [];
    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let all_alpha_chars = [];

    data.forEach(item => {
      const str = item.toString();
      if (/^\d+$/.test(str)) {
        if (parseInt(str) % 2 === 0) {
          even_numbers.push(str);
        } else {
          odd_numbers.push(str);
        }
        sum += parseInt(str);
      } else if (/^[a-zA-Z]+$/.test(str)) {
        alphabets.push(str.toUpperCase());
        all_alpha_chars.push(...str);
      } else {
        special_characters.push(str);
      }
    });

    let reversed = all_alpha_chars.reverse();
    let concat_string = '';
    for (let i = 0; i < reversed.length; i++) {
      concat_string += i % 2 === 0
        ? reversed[i].toUpperCase()
        : reversed[i].toLowerCase();
    }

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (err) {
    res.status(400).json({
      is_success: false,
      message: 'Error: ' + err.message
    });
  }
});

module.exports = app;

import { Component, OnInit } from '@angular/core';
import quizz_question from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  titulo: String = ' ';

  questions: any = {};
  questionSelected: any = {};

  responses: any = [];
  answers: String[] = [];
  answersSelected: String = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  playerChoose(opAlias: String) {
    this.answers.push(opAlias);
    this.nextStep();
  }

  async nextStep() {
    if (this.questionMaxIndex > this.questionIndex + 1) {
      this.questionIndex++;
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      await this.checkResult();
      this.finished = true;
    }
  }

  async checkResult() {
    let f = 0,
      m = 0,
      s = 0,
      c = 0;
    const total = this.answers.length;

    this.answers.map((answer) => {
      if (answer === 'F') {
        f++;
      } else if (answer === 'M') {
        m++;
      } else if (answer === 'S') {
        s++;
      } else {
        c++;
      }
    });

    this.responses.push({
      tipe: 'f',
      tamanho: ((f / total) * 100).toFixed(),
      mensagem: quizz_question.results.F,
    });
    this.responses.push({
      tipe: 'm',
      tamanho: ((m / total) * 100).toFixed(),
      mensagem: quizz_question.results.M,
    });
    this.responses.push({
      tipe: 's',

      tamanho: ((s / total) * 100).toFixed(),
      mensagem: quizz_question.results.S,
    });
    this.responses.push({
      tipe: 'c',

      tamanho: ((c / total) * 100).toFixed(),
      mensagem: quizz_question.results.C,
    });
  }

  ngOnInit(): void {
    this.finished = false;
    this.titulo = quizz_question.title;

    this.questions = quizz_question.questions;
    this.questionSelected = this.questions[this.questionIndex];

    this.questionMaxIndex = this.questions.length;
  }
}

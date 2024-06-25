// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat-open-ai.service';
import { FormsModule } from '@angular/forms'; //

import {
  Component,
  AfterViewChecked,
  ElementRef,
  ViewChild,
} from '@angular/core';
// import { ChatService, ChatResponse } from '../chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  chatHistory: { userMessage?: string; responseMessage?: string }[] = [];
  userInput: string = '';

  constructor(private chatService: ChatService) {}

  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  sendMessage(): void {
    if (this.userInput.trim()) {
      this.chatHistory.push({ userMessage: this.userInput });
      this.chatService.sendMessage(this.userInput).subscribe((response) => {
        this.chatHistory.push({ responseMessage: response.response });
      });
      this.userInput = '';
    }
  }

  // private scrollToBottom(): void {
  //   try {
  //     this.chatContainer.nativeElement.scrollTop =
  //       this.chatContainer.nativeElement.scrollHeight;
  //   } catch (err) {
  //     console.error('Error scrolling to bottom:', err);
  //   }
  // }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/model/food';
import { CartService } from 'src/app/service/cart.service';
import { CommentService } from 'src/app/service/comment.service';
import { FoodService } from 'src/app/service/food.service';
import { Comment } from 'src/app/model/comment';  // <-- IMPORTANT


@Component({
  selector: 'app-card-food',
  templateUrl: './card-food.component.html',
  styleUrls: ['./card-food.component.css']
})
export class CardFoodComponent implements OnInit {

  foodDetails !: Food | any;
  foodId:string = '0'
  isDisabled: boolean = false

  comments: Comment[] = [];
  reviewRating: number = 0;
  reviewComment: string = '';
  userName: string = 'Anonymous'; 

  maxRating: number = 0;


  constructor(private activatedRoute:ActivatedRoute, private foodService : FoodService, private cartService: CartService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.foodId = this.activatedRoute.snapshot.params['id'];
    console.log('id',this.foodId)
    this.foodService.getFoodsById(this.foodId).subscribe(
      (value) => {
        this.foodDetails = value;
        const isItemInCartList = this.cartService.cartList.find(item => item.id === this.foodDetails.id);
        this.isDisabled = isItemInCartList ? true : false;
      }
    );

    this.getComments();
  }

  getComments() {
    this.commentService.getCommentsByFoodId(+this.foodId).subscribe(comments => {
      this.comments = comments;

      // Calcule la note la plus élevée
      if (this.comments.length > 0) {
        this.maxRating = Math.max(...this.comments.map(c => c.rating));
      } else {
        this.maxRating = 0; // ou null
      }
    });
  }

  setReviewRating(rating: number) {
    this.reviewRating = rating;
  }

  submitReview() {
    if (!this.reviewComment || this.reviewRating === 0) {
      alert('Merci de remplir la note et le commentaire');
      return;
    }

    const newComment: Comment = {
      id: 0,
      foodId: +this.foodId,
      userName: this.userName,
      comment: this.reviewComment,
      rating: this.reviewRating,
      date: new Date()
    };


    this.commentService.addComment(newComment).subscribe(() => {
      this.reviewComment = '';
      this.reviewRating = 0;
      this.getComments();  // Recharge les commentaires
    });
  }

  

  addCartItem () {
    this.cartService.addToCart(this.foodDetails);
    this.isDisabled = true;
  }


  

}

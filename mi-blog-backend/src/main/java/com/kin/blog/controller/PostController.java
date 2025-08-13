package com.kin.blog.controller;

import com.kin.blog.exception.ValidationException;
import com.kin.blog.model.Post;
import com.kin.blog.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@Controller
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/")
    public String listarPosts(Model model) {
        model.addAttribute("posts", postService.findAll());
        return "lista-posts";
    }
    
    @GetMapping("/crear-post")
    public String mostrarFormularioCreacion(Model model) {
        model.addAttribute("post", new Post());
        return "crear-post";
    }
    
    @PostMapping("/crear-post")
    public String guardarPost(@ModelAttribute Post post, Model model) {
        try {  
            postService.save(post);
            return "redirect:/";
        } catch (ValidationException e) {
            model.addAttribute("error", e.getMessage());
            model.addAttribute("post", post);
            return "/crear-post";
        }
        
        
    }

    @GetMapping("/posts/{id}")
    public String verDetallesDelPost(@PathVariable Long id, Model model) {
    Post post = postService.findById(id).orElse(null);
        if (post != null) {
                model.addAttribute("post", post);
                return "post-detalle";
        }
        return "redirect:/";
    }

}

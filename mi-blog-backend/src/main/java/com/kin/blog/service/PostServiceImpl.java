package com.kin.blog.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.kin.blog.exception.ValidationException;
import com.kin.blog.model.Post;
import com.kin.blog.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;


        @Override
    public Post save(Post post) {

        List<String> errors = new ArrayList<>();

        if (post.getTitulo() == null || post.getTitulo().trim().isEmpty()){
            errors.add("el titulo no puede estar vacio");
        }
        if (post.getContenido() == null || post.getContenido().trim().isEmpty()){
            errors.add("el contenido no puede estar vacio");
        }
        if (!errors.isEmpty()) {
            throw new ValidationException(String.join("\n", errors));
        }
        return postRepository.save(post);
    }

    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        postRepository.deleteById(id);
    }
}

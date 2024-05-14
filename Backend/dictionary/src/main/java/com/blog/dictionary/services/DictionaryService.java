package com.blog.dictionary.services;

import com.blog.dictionary.DTOs.WordDTO;
import com.blog.dictionary.Repositories.DictionaryRepository;
import com.blog.dictionary.entities.Search;
import com.blog.dictionary.entities.Word;
import com.blog.dictionary.entities.WordDetail;
import com.blog.dictionary.exceptions.NotFound;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class DictionaryService {
    private static final Logger LOGGER = LoggerFactory.getLogger(DictionaryService.class);

    @Autowired
    private DictionaryRepository repository;
    @Autowired
    WebClient webClient;
    @Autowired
    ModelMapper mapper;
    @Value("${wordsapi.host}")
    private String wordsapiHost;
    @Value("${wordsapi.key}")
    private String wordsapiKey;

    public WordDTO fetchWord(String word) {
        String url = "https://wordsapiv1.p.rapidapi.com/words/" + word;
        Word searchWord = repository.findByWord(word).orElseGet(() -> callWordsAPI(url));
        return mapper.map(searchWord, WordDTO.class);

    }

    public WordDTO random() {
        String url = "https://wordsapiv1.p.rapidapi.com/words/?random=true";
        return mapper.map(callWordsAPI(url), WordDTO.class);
    }

    public Search search(String word) {
        String url = "https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^%s\\S*$".formatted(word);
        return webClient.get().uri(url)
                .header("X-RapidAPI-Host", wordsapiHost)
                .header("X-RapidAPI-Key", wordsapiKey)
                .header("Accept", "application/json")
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new NotFound("Not found please try again")))
                .bodyToMono(Search.class)
                .block();
    }

    private Word callWordsAPI(String url) {
        LOGGER.info("Calling words API");
        Word result = webClient.get().uri(url)
                .header("X-RapidAPI-Host", wordsapiHost)
                .header("X-RapidAPI-Key", wordsapiKey)
                .header("Accept", "application/json")
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new NotFound("Not found please try again")))
                .bodyToMono(Word.class)
                .mapNotNull(word -> {
                    if (word != null) {
                        if (word.getPronunciation() != null) {
                            word.getPronunciation().setWord(word);
                        }
                        if (word.getSyllables() != null) {
                            word.getSyllables().setWord(word);
                        }
                        if (word.getResults() != null) {
                            for (WordDetail detail : word.getResults()) {
                                detail.setWord(word);
                            }
                        }
                    }
                    return word;
                })
                .block();
        if (result != null) {
            if (repository.existsByWord(result.getWord())) {
                LOGGER.info("Word found");
                return result;
            } else {
                LOGGER.info("Word not found");
                return repository.save(result);
            }
        } else
            throw new NotFound("Not found please try again");
    }


}

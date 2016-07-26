/**
 * Created by answer on 2016/7/26.
 */
suite('"About" Page Tests',function(){
    test('page should contain link to contact page',function(){
        assert($('a[href="/contact"]').length);
    });
});